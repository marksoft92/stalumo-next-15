import { create } from "zustand";

type LineItem = {
    product_id: number;
    quantity: number;
};

type CartState = {
    line_items: LineItem[];
    addItem: (product_id: number, quantity?: number) => void;
    removeItem: (product_id: number) => void;
    clearCart: () => void;
    updateQuantity: (product_id: number, quantity: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
    line_items: [],

    addItem: (product_id, quantity = 1) =>
        set((state) => {
            const existing = state.line_items.find((item) => item.product_id === product_id);
            if (existing) {
                return {
                    line_items: state.line_items.map((item) =>
                        item.product_id === product_id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                };
            }
            return { line_items: [...state.line_items, { product_id, quantity }] };
        }),

    removeItem: (product_id) =>
        set((state) => ({
            line_items: state.line_items.filter((item) => item.product_id !== product_id),
        })),

    updateQuantity: (product_id, quantity) =>
        set((state) => ({
            line_items: state.line_items.map((item) =>
                item.product_id === product_id ? { ...item, quantity } : item
            ),
        })),

    clearCart: () => set({ line_items: [] }),
}));
