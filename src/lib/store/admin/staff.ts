"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StaffRole = "Owner" | "Manager" | "Editor";
export type StaffStatus = "Active" | "Invited" | "Inactive";

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  avatar: string;
  twoFAEnabled: boolean;
  lastSignIn: string | null;
  status: StaffStatus;
}

interface StaffState {
  members: StaffMember[];
  _hydrated: boolean;
}

interface StaffActions {
  addMember: (member: StaffMember) => void;
  updateMember: (id: string, updates: Partial<StaffMember>) => void;
  removeMember: (id: string) => void;
  setHydrated: () => void;
}

type StaffStore = StaffState & StaffActions;

// ─── Seed ─────────────────────────────────────────────────────────────────────

const seedMembers: StaffMember[] = [
  {
    id: "staff_01",
    name: "Ashfia Khatun",
    email: "ashfia@msweaver.com",
    role: "Owner",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=80",
    twoFAEnabled: true,
    lastSignIn: new Date().toISOString(),
    status: "Active",
  },
  {
    id: "staff_02",
    name: "Nusrat Jahan",
    email: "nusrat@msweaver.com",
    role: "Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    twoFAEnabled: false,
    lastSignIn: "2026-05-10T09:30:00.000Z",
    status: "Active",
  },
  {
    id: "staff_03",
    name: "Rifat Ahmed",
    email: "rifat@msweaver.com",
    role: "Editor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    twoFAEnabled: false,
    lastSignIn: null,
    status: "Invited",
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ members: StaffMember[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminStaff = create<StaffStore>()(
  persist(
    (set) => ({
      members: seedMembers,
      _hydrated: false,

      addMember: (member) => {
        set((state) => ({ members: [...state.members, member] }));
      },

      updateMember: (id, updates) => {
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updates } : m,
          ),
        }));
      },

      removeMember: (id) => {
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:staff:v1",
      storage,
      partialize: (state) => ({ members: state.members }),
      skipHydration: true,
    },
  ),
);
