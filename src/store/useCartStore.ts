import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;

  paymentMethod: "credit" | "debit" | "money" | "pix" | null;
  setPaymentMethod: (method: CartState["paymentMethod"]) => void;

  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      paymentMethod: null,
      setPaymentMethod: (method) => set({ paymentMethod: method }),

      addToCart: (item) => {
        const cart = get().cart;
        const exists = cart.find((c) => c.id === item.id);

        if (exists) {
          const updated = cart.map((c) =>
            c.id === item.id
              ? { ...c, quantity: c.quantity + item.quantity }
              : c
          );

          return set({ cart: updated });
        }

        set({ cart: [...cart, item] });
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, quantity) =>
        set(() => {
          const validQuantity = Math.max(1, quantity);

          return {
            cart: get().cart.map((item) =>
              item.id === id
                ? { ...item, quantity: validQuantity }
                : item
            ),
          };
        }),

      getCartTotal: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: "coffee-cart" }
  )
);
