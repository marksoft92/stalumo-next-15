"use client";

import EmptyCart from "@/components/cart/EmptyCart";
import { Link } from "@/i18n/routing";
import { useCartStore } from "@/store/cartStore";
import { Plus, Minus, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
interface CartProps {
    products: any[];
    locale: any;
}


export default function Cart({ products, locale }: CartProps) {
    const lineItems = useCartStore((state) => state.line_items);
    const removeFromCart = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const itsPolish = locale === 'pl'
    const currency = itsPolish ? "zł" : "PLN"
    const t = useTranslations("Cart")
    // Mapowanie koszyka na produkty
    const cartItems = lineItems
        .map((item) => {
            const product = products.find((p) => p.id === item.product_id);
            return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean);

    const totalPrice = cartItems.reduce(
        (sum, item: any) => sum + Number(item.sale_price) * item.quantity,
        0
    );

    if (!cartItems.length) {
        return <div className="p-8 text-center text-lg"><EmptyCart /></div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">{t("yourCart")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cartItems.map((item: any) => (
                    <div key={item.id} className="flex gap-4 bg-neutral-900 p-4 rounded-xl items-center">
                        <img
                            src={item.images[0]?.src}
                            alt={item?.meta_data_parsed?.locales?.[locale]?.title}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">

                            <h2 className="text-xl font-semibold text-white">{item?.meta_data_parsed?.locales?.[locale]?.title}</h2>
                            <p className="text-red-500 font-bold">{item.sale_price} {currency}</p>
                            <div className="flex items-center mt-2 gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="p-2 bg-gray-800 rounded"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 bg-gray-800 rounded"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-4 p-2 bg-red-600 rounded"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-xl font-bold">{t("total")}: {totalPrice.toFixed(2)} {currency}</span>
                    {itsPolish && <span className="text-s text-[gray]">{t("freeDeliveryInfo")}</span>}
                </div>
                <Link href="/checkout">
                    <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all">
                        {t("checkout")}
                    </button>
                </Link>
            </div>
        </div>
    );
}
