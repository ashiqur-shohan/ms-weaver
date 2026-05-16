"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customers as mockCustomers } from "@/lib/mock/customers";
import type { Customer } from "@/lib/mock/customers";

interface AdminCustomersState {
  customers: Customer[];
  _hydrated: boolean;
}

interface AdminCustomersActions {
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  updateNotes: (id: string, notes: string) => void;
  setHydrated: () => void;
}

type AdminCustomersStore = AdminCustomersState & AdminCustomersActions;

const storage = createJSONStorage<{ customers: Customer[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

export const useAdminCustomers = create<AdminCustomersStore>()(
  persist(
    (set) => ({
      customers: mockCustomers,
      _hydrated: false,

      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, ...updates } : c,
          ),
        }));
      },

      addTag: (id, tag) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id
              ? { ...c, tags: [...new Set([...c.tags, tag])] }
              : c,
          ),
        }));
      },

      removeTag: (id, tag) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id
              ? { ...c, tags: c.tags.filter((t) => t !== tag) }
              : c,
          ),
        }));
      },

      updateNotes: (id, notes) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, notes } : c,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:customers:v1",
      storage,
      partialize: (state) => ({ customers: state.customers }),
      skipHydration: true,
    },
  ),
);
