"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore"; // 🔽 dostosuj ścieżkę
import { Link } from "@/i18n/routing";

export default function CartIcon() {
    // pobieramy koszyk ze store
    const lineItems = useCartStore((state) => state.line_items);

    // sumujemy ilość sztuk
    const totalQuantity = lineItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {totalQuantity > 0 && (<div className="relative px-3 ">
                <Link href="/cart">
                    <ShoppingCart className="w-7 h-7 text-white " />


                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {totalQuantity}
                    </span>

                </Link>
            </div>)}
        </>
    );
}
