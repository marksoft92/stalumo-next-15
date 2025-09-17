import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const locale = searchParams.get("locale") || "en";
        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "12";



        const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
        const apiUrl = process.env.WOOCOMMERCE_API_URL;

        if (!consumerKey || !consumerSecret || !apiUrl) {
            throw new Error("❌ Brak konfiguracji WooCommerce w .env");
        }

        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
        const res = await fetch(
            `${apiUrl}/products?per_page=${limit}&page=${page}`,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
                cache: "no-store",
            }
        );



        if (!res.ok) {
            const errorText = await res.text();
            console.error("❌ WooCommerce response:", errorText);
            return NextResponse.json(
                { error: "Failed to fetch from WooCommerce", details: errorText },
                { status: res.status }
            );
        }

        let products = await res.json();

        // 🔽 Parsowanie meta_data
        products = products.map((product: any) => {
            try {
                const value = product?.meta_data?.[0]?.value;
                if (value) {
                    product.meta_data_parsed = JSON.parse(value);
                } else {
                    product.meta_data_parsed = null;
                }
            } catch (e) {
                console.error("❌ Błąd parsowania JSON:", e);
                product.meta_data_parsed = null;
            }
            return product;
        });

        return NextResponse.json(products);
    } catch (err: any) {
        console.error("❌ Błąd w /api/products:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
        const apiUrl = process.env.WOOCOMMERCE_API_URL;

        if (!consumerKey || !consumerSecret || !apiUrl) {
            throw new Error("❌ Brak konfiguracji WooCommerce w .env");
        }

        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

        // 📥 dane zamówienia od klienta
        const body = await req.json();

        const res = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(body),
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

        // jeśli WooPayments zwróci `payment_url`
        if (order.payment_url) {
// order.payment_url
console.log("👉 Payment URL:", 1);
        }

        return NextResponse.json(order);
    } catch (err: any) {
        console.error("❌ Błąd w /api/orders:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}