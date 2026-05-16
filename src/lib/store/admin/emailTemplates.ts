"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmailTemplateId =
  | "order_confirmation"
  | "shipping_notification"
  | "custom_request_reply"
  | "password_reset";

export interface EmailTemplate {
  id: EmailTemplateId;
  name: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  body: string;
  variables: string[];
}

interface EmailTemplatesState {
  templates: EmailTemplate[];
  _hydrated: boolean;
}

interface EmailTemplatesActions {
  updateTemplate: (id: EmailTemplateId, updates: Partial<EmailTemplate>) => void;
  setHydrated: () => void;
}

type EmailTemplatesStore = EmailTemplatesState & EmailTemplatesActions;

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultTemplates: EmailTemplate[] = [
  {
    id: "order_confirmation",
    name: "Order Confirmation",
    subject: "Your order {{order_number}} has been received — Ms Weaver",
    fromName: "Ms Weaver Atelier",
    fromEmail: "atelier@msweaver.com",
    variables: ["{{customer_name}}", "{{order_number}}", "{{order_total}}", "{{estimated_completion}}", "{{items_list}}"],
    body: `Dear {{customer_name}},

Thank you for your order. We have received your order {{order_number}} and it is now with us in the atelier.

Your order total is {{order_total}}.

Every piece at Ms Weaver is made to order. Your estimated completion date is {{estimated_completion}}. We will send you a shipping notification as soon as your piece has left the atelier.

If you have any questions, please reply to this email or write to us at atelier@msweaver.com.

With care,
Ashfia Khatun
Ms Weaver`,
  },
  {
    id: "shipping_notification",
    name: "Shipping Notification",
    subject: "Your order {{order_number}} has left the atelier — Ms Weaver",
    fromName: "Ms Weaver Atelier",
    fromEmail: "atelier@msweaver.com",
    variables: ["{{customer_name}}", "{{order_number}}", "{{tracking_number}}", "{{courier_name}}", "{{tracking_url}}"],
    body: `Dear {{customer_name}},

Good news — your order {{order_number}} has left the atelier and is on its way to you.

Courier: {{courier_name}}
Tracking number: {{tracking_number}}
Track your order: {{tracking_url}}

If you have any questions about delivery, please reply to this email and we will liaise with the courier on your behalf.

With care,
Ashfia Khatun
Ms Weaver`,
  },
  {
    id: "custom_request_reply",
    name: "Custom Request Reply",
    subject: "Re: Your custom request — Ms Weaver",
    fromName: "Ashfia at Ms Weaver",
    fromEmail: "atelier@msweaver.com",
    variables: ["{{customer_name}}", "{{request_description}}", "{{estimated_price}}", "{{lead_time}}"],
    body: `Dear {{customer_name}},

Thank you for your custom request. I have reviewed your enquiry and I am delighted to take on this commission.

Here are the details as I understand them:
{{request_description}}

Estimated price: {{estimated_price}}
Estimated lead time from deposit confirmation: {{lead_time}}

To confirm the commission, I require a 50% deposit. I will send payment details separately. Please reply to this email with any questions or adjustments before we proceed.

With care,
Ashfia Khatun
Ms Weaver`,
  },
  {
    id: "password_reset",
    name: "Password Reset",
    subject: "Reset your Ms Weaver password",
    fromName: "Ms Weaver",
    fromEmail: "noreply@msweaver.com",
    variables: ["{{customer_name}}", "{{reset_link}}", "{{expiry_time}}"],
    body: `Dear {{customer_name}},

We received a request to reset the password for your Ms Weaver account.

Click the link below to set a new password. This link expires in {{expiry_time}}.

Reset password: {{reset_link}}

If you did not request a password reset, please disregard this email. Your account remains secure.

Ms Weaver`,
  },
];

// ─── SSR-safe storage ─────────────────────────────────────────────────────────

const storage = createJSONStorage<{ templates: EmailTemplate[] }>(() =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : localStorage,
);

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdminEmailTemplates = create<EmailTemplatesStore>()(
  persist(
    (set) => ({
      templates: defaultTemplates,
      _hydrated: false,

      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          ),
        }));
      },

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "msweaver:admin:emailTemplates:v1",
      storage,
      partialize: (state) => ({ templates: state.templates }),
      skipHydration: true,
    },
  ),
);
