import { NextResponse } from "next/server";
import { buffer } from "stream/consumers"; // opcjonalnie jeśli potrzebujesz

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

        // 🔹 Tworzymy strukturę do WooCommerce API
        const wooOrder = {
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
                first_name: body.first_name,
                last_name: body.last_name,
                company: body.company || "",
                address_1: body.address_1,
                city: body.city,
                postcode: body.postcode,
                country: body.country,
            },
            line_items: body.line_items || [], // ❗ z globalnego store
            meta_data: body.vat_number ? [{ key: "billing_nip", value: body.vat_number }] : [],
        };

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

        return NextResponse.json(order);
    } catch (err: any) {
        console.error("❌ Błąd w /api/woo-order:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
