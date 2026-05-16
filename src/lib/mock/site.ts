// ─── Site-wide configuration ────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    columns: Array<{
      heading: string;
      links: Array<NavLink>;
    }>;
    featuredImage?: {
      url: string;
      alt: string;
      href: string;
    };
  };
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    pinterest: string;
    whatsapp: string;
  };
  announcementBar: {
    enabled: boolean;
    message: string;
    linkText: string;
    linkHref: string;
    dismissible: boolean;
  };
  footer: {
    columns: Array<{
      title: string;
      links: Array<NavLink>;
    }>;
    /** Template string — use "{year}" as the placeholder. Footer fills it in at render time. */
    copyrightTemplate: string;
    paymentBadges: string[];
    shippingNote: string;
  };
  nav: {
    primary: NavItem[];
    account: {
      loginHref: string;
      registerHref: string;
      dashboardHref: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "Ms Weaver",
  tagline: "Handwoven Elegance",
  description:
    "Each piece leaves the atelier in Dhaka carrying the hours of one careful pair of hands. Ms Weaver creates made-to-order crochet for those who believe the objects they live with should be chosen slowly.",
  logoUrl: "/logo.svg",
  faviconUrl: "/favicon.ico",

  contact: {
    email: "atelier@msweaver.com",
    phone: "+880 1712 345678",
    address:
      "House 14, Road 7, Block C, Banani, Dhaka 1213, Bangladesh",
    hours: "Saturday – Thursday, 10 am – 6 pm BST",
  },

  socials: {
    instagram: "https://instagram.com/msweaver.bd",
    facebook: "https://facebook.com/msweaver.bd",
    pinterest: "https://pinterest.com/msweaverbd",
    whatsapp: "https://wa.me/8801712345678",
  },

  announcementBar: {
    enabled: true,
    message: "Free delivery on orders above ৳ 5,000 within Dhaka",
    linkText: "See full shipping details",
    linkHref: "/help/shipping",
    dismissible: true,
  },

  footer: {
    columns: [
      {
        title: "Shop",
        links: [
          { label: "All Pieces", href: "/shop" },
          { label: "New Arrivals", href: "/shop/new-arrivals" },
          { label: "Bridal", href: "/collections/bridal" },
          { label: "Home", href: "/collections/heirloom-home" },
          { label: "Accessories", href: "/collections/soft-accessories" },
          { label: "Bespoke", href: "/custom-order" },
        ],
      },
      {
        title: "Atelier",
        links: [
          { label: "Our Story", href: "/about" },
          { label: "Craft Process", href: "/about/process" },
          { label: "Journal", href: "/journal" },
          { label: "Lookbook", href: "/lookbook" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "FAQ", href: "/faq" },
          { label: "Shipping", href: "/legal/shipping" },
          { label: "Returns", href: "/legal/returns" },
          { label: "Care Guide", href: "/care-guide" },
          { label: "Custom Order", href: "/custom-order" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/legal/privacy" },
          { label: "Terms & Conditions", href: "/legal/terms" },
        ],
      },
      {
        title: "Stay In Touch",
        links: [
          { label: "Instagram", href: "https://instagram.com/msweaver.bd" },
          { label: "Facebook", href: "https://facebook.com/msweaver.bd" },
          { label: "Pinterest", href: "https://pinterest.com/msweaverbd" },
          { label: "WhatsApp", href: "https://wa.me/8801712345678" },
        ],
      },
    ],
    copyrightTemplate: "© {year} Ms Weaver. All rights reserved.",
    paymentBadges: ["bkash", "nagad", "visa", "mastercard", "cod"],
    shippingNote:
      "Complimentary delivery within Dhaka on orders above ৳ 5,000. Nationwide shipping in 3–5 business days.",
  },

  nav: {
    primary: [
      {
        label: "Shop",
        href: "/shop",
        megaMenu: {
          columns: [
            {
              heading: "Collections",
              links: [
                { label: "New Arrivals", href: "/shop/new-arrivals" },
                { label: "Bridal", href: "/collections/bridal" },
                { label: "Heirloom Home", href: "/collections/heirloom-home" },
                {
                  label: "Soft Accessories",
                  href: "/collections/soft-accessories",
                },
                {
                  label: "Bespoke Atelier",
                  href: "/collections/bespoke-atelier",
                },
                {
                  label: "Spring Capitals",
                  href: "/collections/spring-capitals",
                },
              ],
            },
            {
              heading: "By Type",
              links: [
                { label: "Throws & Blankets", href: "/shop?type=throws" },
                { label: "Veils & Bridal", href: "/shop?type=bridal" },
                { label: "Bags & Totes", href: "/shop?type=bags" },
                { label: "Hats & Berets", href: "/shop?type=hats" },
                { label: "Shawls & Wraps", href: "/shop?type=shawls" },
                { label: "Home Décor", href: "/shop?type=home" },
              ],
            },
          ],
          featuredImage: {
            url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&auto=format&fit=crop&q=80",
            alt: "Hand-knotted cream throw draped over an oak bench in afternoon light",
            href: "/collections/heirloom-home",
          },
        },
      },
      { label: "Collections", href: "/collections" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    account: {
      loginHref: "/account/login",
      registerHref: "/account/register",
      dashboardHref: "/account",
    },
  },
};
