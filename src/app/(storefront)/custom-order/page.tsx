import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CustomOrderForm } from "@/components/forms/CustomOrderForm";

export const metadata: Metadata = {
  title: "Custom Order — Ms Weaver",
  description:
    "Commission a bespoke piece from Ashfia Khatun. Bridal, heirloom, home, or gift — made entirely to your brief.",
};

const processSteps = [
  {
    number: "01",
    title: "Consult",
    description:
      "Submit a request and Ashfia will respond within 3 business days with questions and a preliminary concept. A short call or WhatsApp conversation follows.",
  },
  {
    number: "02",
    title: "Sketch",
    description:
      "A written brief — pattern notes, dimensions, materials, colourway — is shared for your approval. Revisions are welcome at this stage.",
  },
  {
    number: "03",
    title: "Sample",
    description:
      "For complex pieces, a small swatch sample is produced and photographed. You confirm before the full work begins.",
  },
  {
    number: "04",
    title: "Craft",
    description:
      "The piece is made by Ashfia alone. Progress photographs are shared at key stages. On completion, you receive final images before dispatch.",
  },
];

const bespokeGallery = [
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
    alt: "Bespoke ivory christening blanket with lace border edging in finest cotton",
    width: 800,
    height: 1000,
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
    alt: "Hand-crocheted bridal veil in cotton lace, draped over a wooden frame for the atelier photograph",
    width: 800,
    height: 800,
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    alt: "Bespoke sage heirloom throw commissioned for a wedding anniversary, the stitch pattern a variation of a family design",
    width: 800,
    height: 600,
  },
];

export default function CustomOrderPage() {
  return (
    <>
      {/* Hero */}
      <section
        aria-label="Custom order hero"
        className="relative h-[70vh] min-h-[480px] w-full overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1600&auto=format&fit=crop&q=80"
          alt="Ashfia's hands working the hook through cream yarn in the atelier — the beginning of a bespoke piece"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <div className="absolute bottom-0 left-0 px-6 pb-16 md:px-12 md:pb-20 lg:px-20 lg:pb-24">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground/80">
            BESPOKE
          </p>
          <h1 className="max-w-2xl font-serif text-[56px] font-light leading-[62px] tracking-[-0.02em] text-primary-foreground">
            Commission a piece.
          </h1>
          <p className="mt-4 max-w-[45ch] text-[18px] leading-[28px] text-primary-foreground/80">
            Made entirely to your brief. One maker. No compromises.
          </p>
        </div>
      </section>

      <Container className="py-16 md:py-20 lg:py-32">
        {/* Editorial copy */}
        <div className="mb-20 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              BESPOKE ATELIER
            </p>
            <h2 className="mb-8 font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
              What bespoke means here.
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[18px] leading-[28px] text-muted-foreground">
                A bespoke piece from Ms Weaver is not a product with your name on it. It is a piece made from the beginning to a brief that did not exist before you described it. The pattern, the colour, the dimensions, the material — all decided in conversation, all executed by a single pair of hands.
              </p>
              <p className="text-[18px] leading-[28px] text-muted-foreground">
                We accept a small number of bespoke commissions at any one time. This is not scarcity marketing — it is the simple arithmetic of one maker working alone. Each commission receives complete attention. That is only possible if the number of concurrent commissions stays small.
              </p>
              <p className="text-[18px] leading-[28px] text-muted-foreground">
                The process begins with a conversation. Nothing is committed until you have seen the brief written back to you and confirmed it is right. The deposit is due only at that point. From there, we work — and we keep you informed throughout.
              </p>
            </div>
          </div>
        </div>

        {/* Process steps */}
        <ScrollReveal margin="-80px">
          <div className="mb-20 border-t border-border pt-12">
            <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              THE PROCESS
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.number} className="flex flex-col gap-4">
                  <p className="font-serif text-[72px] font-light italic leading-none tracking-[-0.03em] text-border">
                    {step.number}
                  </p>
                  <h3 className="font-serif text-[28px] font-normal leading-[36px] tracking-[-0.01em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-[22px] text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Past bespoke gallery */}
        <div className="mb-20 border-t border-border pt-12">
          <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            PAST COMMISSIONS
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {bespokeGallery.map((img, i) => (
              <figure key={i} className="overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="border-t border-border pt-12">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-4">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                REQUEST CONSULTATION
              </p>
              <h2 className="mb-4 font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground">
                Tell us about your piece.
              </h2>
              <p className="text-[16px] leading-[26px] text-muted-foreground">
                No commitment until you have seen the brief confirmed and the estimate agreed. Ashfia reviews every request personally.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <CustomOrderForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
