"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customRequests as mockRequests } from "@/lib/mock/customRequests";
import type { CustomRequest, RequestStatus } from "@/lib/mock/customRequests";

// Extended request with admin-specific fields
export interface AdminCustomRequest extends CustomRequest {
  priority?: "high" | "medium" | "low";
  archived?: boolean;
}

interface AdminCustomRequestsState {
  requests: AdminCustomRequest[];
  _hydrated: boolean;
}

interface AdminCustomRequestsActions {
  updateRequest: (id: string, updates: Partial<AdminCustomRequest>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updatePriority: (id: string, priority: "high" | "medium" | "low") => void;
  updateInternalNotes: (id: string, notes: string) => void;
  archiveRequest: (id: string) => void;
  unarchiveRequest: (id: string) => void;
  setHydrated: () => void;
}

type AdminCustomRequestsStore = AdminCustomRequestsState &
  AdminCustomRequestsActions;

const storage = createJSONStorage<{ requests: AdminCustomRequest[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

const seedRequests: AdminCustomRequest[] = mockRequests.map((r) => ({
  ...r,
  priority: "medium" as const,
  archived: false,
}));

export const useAdminCustomRequests = create<AdminCustomRequestsStore>()(
  persist(
    (set) => ({
      requests: seedRequests,
      _hydrated: false,

      updateRequest: (id, updates) => {
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, ...updates } : r,
          ),
        }));
      },

      updateRequestStatus: (id, status) => {
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status,
                  respondedAt:
                    status !== "new" && !r.respondedAt
                      ? new Date().toISOString()
                      : r.respondedAt,
                }
              : r,
          ),
        }));
      },

      updatePriority: (id, priority) => {
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, priority } : r,
          ),
        }));
      },

      updateInternalNotes: (id, notes) => {
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, internalNotes: notes } : r,
          ),
        }));
      },

      archiveRequest: (id) => {
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, archived: true } : r,
          ),
        }));
      },

      unarchiveRequest: (id) => {
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, archived: false } : r,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:requests:v1",
      storage,
      partialize: (state) => ({ requests: state.requests }),
      skipHydration: true,
    },
  ),
);
