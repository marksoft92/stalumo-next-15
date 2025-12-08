// app/api/woo-order/route.ts
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

        // 📥 dane zamówienia od klienta (formularz Next.js)
        const body = await req.json();

        // 🔹 Przygotuj meta_data
        const metaData = [];

        // Dodaj NIP jeśli istnieje
        if (body.vat_number) {
            metaData.push({ key: "billing_nip", value: body.vat_number });
        }

        // Dodaj informację o rabacie jeśli był zastosowany kupon
        if (body.discount_amount && body.discount_amount > 0) {
            metaData.push({
                key: "_cart_discount",
                value: body.discount_amount.toString()
            });
        }

        // 🔹 Przygotuj coupon_lines jeśli był zastosowany kupon
        const couponLines = [];
        if (body.coupon_code && body.discount_amount) {
            couponLines.push({
                code: body.coupon_code,
                discount: body.discount_amount.toString()
            });
        }

        // 🔹 Tworzymy strukturę do WooCommerce API
        const wooOrder: any = {
            payment_method: "wcpay",
            payment_method_title: "WooCommerce Payments",
            set_paid: false,
            billing: {
                first_name: body.first_name,
                last_name: body.last_name,
                company: body.company || "",
                address_1: body.address_1,
                city: body.city,
                postcode: body.postcode,
                country: body.country,
                email: body.email,
                phone: body.phone,
            },
            shipping: {
                first_name: body.shipping?.first_name || body.first_name,
                last_name: body.shipping?.last_name || body.last_name,
                address_1: body.shipping?.address_1 || body.address_1,
                city: body.shipping?.city || body.city,
                postcode: body.shipping?.postcode || body.postcode,
                country: body.shipping?.country || body.country,
                phone: body.shipping?.phone || body.phone,
            },
            line_items: body.line_items || [],
            meta_data: metaData,
        };

        // ✅ Dodaj coupon_lines tylko jeśli kupon został zastosowany
        if (couponLines.length > 0) {
            wooOrder.coupon_lines = couponLines;
        }

        console.log("📦 Wysyłam zamówienie do WooCommerce:", JSON.stringify(wooOrder, null, 2));

        const res = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(wooOrder),
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("❌ WooCommerce response:", errorText);
            return NextResponse.json(
                { error: "Failed to create order", details: errorText },
                { status: res.status }
            );
        }

        const order = await res.json();

        console.log("✅ Zamówienie utworzone:", order.id);

        return NextResponse.json(order);
    } catch (err: any) {
        console.error("❌ Błąd w /api/woo-order:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
} 