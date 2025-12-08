import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
        const apiUrl = process.env.WOOCOMMERCE_API_URL;

        if (!consumerKey || !consumerSecret || !apiUrl) {
            throw new Error("❌ Brak konfiguracji WooCommerce w .env");
        }

        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

        const { code, subtotal } = await req.json();

        if (!code || !code.trim()) {
            return NextResponse.json(
                { valid: false, error: "Kod rabatowy jest wymagany" },
                { status: 400 }
            );
        }

        // 🔍 Pobierz wszystkie kupony z WooCommerce
        const res = await fetch(`${apiUrl}/coupons?code=${encodeURIComponent(code)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("❌ WooCommerce coupon response:", errorText);
            return NextResponse.json(
                { valid: false, error: "Nie można zweryfikować kuponu" },
                { status: 400 }
            );
        }

        const coupons = await res.json();

        // Sprawdź czy kupon istnieje
        if (!coupons || coupons.length === 0) {
            return NextResponse.json(
                { valid: false, error: "Nieprawidłowy kod rabatowy" },
                { status: 400 }
            );
        }

        const coupon = coupons[0];

        // Sprawdź czy kupon jest aktywny
        const now = new Date();
        const dateExpires = coupon.date_expires ? new Date(coupon.date_expires) : null;

        if (dateExpires && dateExpires < now) {
            return NextResponse.json(
                { valid: false, error: "Ten kod rabatowy wygasł" },
                { status: 400 }
            );
        }

        // Sprawdź limit użyć
        if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
            return NextResponse.json(
                { valid: false, error: "Ten kod rabatowy został już wykorzystany maksymalną liczbę razy" },
                { status: 400 }
            );
        }

        // Sprawdź minimalną kwotę zamówienia
        if (coupon.minimum_amount && parseFloat(coupon.minimum_amount) > subtotal) {
            return NextResponse.json(
                {
                    valid: false,
                    error: `Minimalna kwota zamówienia dla tego kuponu to ${coupon.minimum_amount} PLN`
                },
                { status: 400 }
            );
        }

        // Sprawdź maksymalną kwotę zamówienia
        if (coupon.maximum_amount && parseFloat(coupon.maximum_amount) < subtotal) {
            return NextResponse.json(
                {
                    valid: false,
                    error: `Maksymalna kwota zamówienia dla tego kuponu to ${coupon.maximum_amount} PLN`
                },
                { status: 400 }
            );
        }

        // Oblicz rabat
        let discount = 0;

        if (coupon.discount_type === "percent") {
            // Rabat procentowy
            discount = (subtotal * parseFloat(coupon.amount)) / 100;
        } else if (coupon.discount_type === "fixed_cart") {
            // Stały rabat na koszyk
            discount = parseFloat(coupon.amount);
        } else if (coupon.discount_type === "fixed_product") {
            // Stały rabat na produkt - będzie obsłużony przez WooCommerce
            discount = parseFloat(coupon.amount);
        }

        // Zaokrąglij do 2 miejsc po przecinku
        discount = Math.round(discount * 100) / 100;

        // Nie pozwól na rabat większy niż wartość koszyka
        if (discount > subtotal) {
            discount = subtotal;
        }

        return NextResponse.json({
            valid: true,
            code: coupon.code,
            discount: discount,
            coupon_id: coupon.id,
            discount_type: coupon.discount_type,
            amount: coupon.amount,
            description: coupon.description || ""
        });

    } catch (err: any) {
        console.error("❌ Błąd w /api/validate-coupon:", err);
        return NextResponse.json(
            { valid: false, error: "Błąd serwera podczas walidacji kuponu" },
            { status: 500 }
        );
    }
}