import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./useCartStore";

export interface Order {
  id: string; 
  items: CartItem[];
  total: number;
  date: string; 
}

interface OrdersState {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (items, total) => {
        const newOrder: Order = {
          id: `ORDER-${Date.now()}`,
          items,
          total,
          date: new Date().toISOString(),
        };

        set({ orders: [newOrder, ...get().orders] });
      },
    }),
    { name: "coffee-orders" }
  )
);
