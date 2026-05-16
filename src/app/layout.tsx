import type { Metadata } from "next";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s · Ms Weaver",
    default: "Ms Weaver — Handwoven Elegance",
  },
  description:
    "Custom hand-knitted crochet by Ashfia Khatun. Made-to-order pieces in the spirit of quiet luxury.",
  openGraph: {
    title: "Ms Weaver — Handwoven Elegance",
    description:
      "Custom hand-knitted crochet by Ashfia Khatun. Made-to-order pieces in the spirit of quiet luxury.",
    siteName: "Ms Weaver",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ms Weaver — Handwoven Elegance",
    description:
      "Custom hand-knitted crochet by Ashfia Khatun. Made-to-order pieces in the spirit of quiet luxury.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
