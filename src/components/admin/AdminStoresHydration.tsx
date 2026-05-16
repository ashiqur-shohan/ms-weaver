"use client";

import { useEffect } from "react";
import { useAdminAuth } from "@/lib/store/adminAuth";
import { useAdminProducts } from "@/lib/store/admin/products";
import { useAdminCollections } from "@/lib/store/admin/collections";
import { useAdminCategories } from "@/lib/store/admin/categories";
import { useAdminOrders } from "@/lib/store/admin/orders";
import { useAdminCustomers } from "@/lib/store/admin/customers";
import { useAdminCustomRequests } from "@/lib/store/admin/customRequests";
import { useAdminHomeBuilder } from "@/lib/store/admin/homeBuilder";
import { useAdminPages } from "@/lib/store/admin/pages";
import { useAdminJournal } from "@/lib/store/admin/journal";
import { useAdminTestimonials } from "@/lib/store/admin/testimonials";
import { useAdminLookbook } from "@/lib/store/admin/lookbook";
import { useAdminMedia } from "@/lib/store/admin/media";
import { useAdminSiteSettings } from "@/lib/store/admin/siteSettings";
import { useAdminSeo } from "@/lib/store/admin/seo";
import { useAdminEmailTemplates } from "@/lib/store/admin/emailTemplates";
import { useAdminDiscounts } from "@/lib/store/admin/discounts";
import { useAdminShipping } from "@/lib/store/admin/shipping";
import { useAdminTax } from "@/lib/store/admin/tax";
import { useAdminStaff } from "@/lib/store/admin/staff";
import { useAdminAnalytics } from "@/lib/store/admin/analytics";

/**
 * Triggers rehydration of all admin Zustand stores from localStorage.
 * Must be mounted as a Client Component in the admin layout.
 * Uses the same skipHydration pattern as CartHydration.
 */
export function AdminStoresHydration() {
  useEffect(() => {
    // Part 1 stores
    void useAdminAuth.persist.rehydrate();
    void useAdminProducts.persist.rehydrate();
    void useAdminCollections.persist.rehydrate();
    void useAdminCategories.persist.rehydrate();
    void useAdminOrders.persist.rehydrate();
    void useAdminCustomers.persist.rehydrate();
    void useAdminCustomRequests.persist.rehydrate();
    // Part 2 stores
    void useAdminHomeBuilder.persist.rehydrate();
    void useAdminPages.persist.rehydrate();
    void useAdminJournal.persist.rehydrate();
    void useAdminTestimonials.persist.rehydrate();
    void useAdminLookbook.persist.rehydrate();
    void useAdminMedia.persist.rehydrate();
    void useAdminSiteSettings.persist.rehydrate();
    void useAdminSeo.persist.rehydrate();
    void useAdminEmailTemplates.persist.rehydrate();
    void useAdminDiscounts.persist.rehydrate();
    void useAdminShipping.persist.rehydrate();
    void useAdminTax.persist.rehydrate();
    void useAdminStaff.persist.rehydrate();
    void useAdminAnalytics.persist.rehydrate();
  }, []);

  return null;
}
