"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { orders as mockOrders } from "@/lib/mock/orders";
import type { Order, OrderStatus } from "@/lib/mock/orders";

interface AdminOrdersState {
  orders: Order[];
  _hydrated: boolean;
}

interface AdminOrdersActions {
  updateOrder: (id: string, updates: Partial<Order>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  cancelOrder: (id: string) => void;
  setHydrated: () => void;
}

type AdminOrdersStore = AdminOrdersState & AdminOrdersActions;

const storage = createJSONStorage<{ orders: Order[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

export const useAdminOrders = create<AdminOrdersStore>()(
  persist(
    (set) => ({
      orders: mockOrders,
      _hydrated: false,

      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, ...updates } : o,
          ),
        }));
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  fulfilledAt:
                    status === "delivered"
                      ? new Date().toISOString()
                      : o.fulfilledAt,
                }
              : o,
          ),
        }));
      },

      cancelOrder: (id) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:orders:v1",
      storage,
      partialize: (state) => ({ orders: state.orders }),
      skipHydration: true,
    },
  ),
);
