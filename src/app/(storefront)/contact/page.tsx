import type { Metadata } from "next";
import Image from "next/image";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  Clock,
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/mock/site";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Ms Weaver",
  description:
    "Write to the Ms Weaver atelier. Custom commissions, care questions, or simply a note.",
};

export default function ContactPage() {
  const { contact, socials } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="WRITE TO US"
        heading="Get in touch"
        subtitle="Whether it is a commission, a question, or simply a note — the atelier is always open."
      />

      <Container className="pb-24 md:pb-32 lg:pb-40">
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-20">
          {/* Form — 5/12, goes first on mobile */}
          <div className="col-span-12 md:col-span-5">
            <h2 className="mb-8 font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
              Send a message
            </h2>
            <ContactForm />
          </div>

          {/* Contact details — 7/12 */}
          <div className="col-span-12 md:col-span-7 md:pl-8 lg:pl-16">
            <h2 className="mb-8 font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
              The atelier
            </h2>

            <div className="flex flex-col gap-6 mb-10">
              {/* Address */}
              <div className="flex gap-4">
                <MapPin
                  size={20}
                  weight="regular"
                  className="mt-0.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    Address
                  </p>
                  <p className="text-[16px] leading-[26px] text-foreground">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <Clock
                  size={20}
                  weight="regular"
                  className="mt-0.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    Hours
                  </p>
                  <p className="text-[16px] leading-[26px] text-foreground">
                    {contact.hours}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <EnvelopeSimple
                  size={20}
                  weight="regular"
                  className="mt-0.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    Email
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[16px] text-foreground underline-offset-2 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone
                  size={20}
                  weight="regular"
                  className="mt-0.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    Phone
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-[16px] text-foreground underline-offset-2 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <WhatsappLogo
                  size={20}
                  weight="regular"
                  className="mt-0.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    WhatsApp
                  </p>
                  <a
                    href={socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-foreground underline-offset-2 hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mb-10 border-t border-border pt-8">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Follow the atelier
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Ms Weaver on Instagram"
                  className="flex h-[44px] w-[44px] items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <InstagramLogo size={20} weight="regular" aria-hidden="true" />
                </a>
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Ms Weaver on Facebook"
                  className="flex h-[44px] w-[44px] items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <FacebookLogo size={20} weight="regular" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=60"
                alt="Placeholder map showing the Banani area of Dhaka where the Ms Weaver atelier is located"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-card/90 px-6 py-4 text-center backdrop-blur-sm">
                  <MapPin
                    size={20}
                    weight="regular"
                    className="mx-auto mb-2 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-[13px] font-medium text-foreground">
                    House 14, Road 7, Block C
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Banani, Dhaka 1213
                  </p>
                  <p className="mt-1 text-[11px] italic text-muted-foreground">
                    Interactive map coming in Phase 2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
