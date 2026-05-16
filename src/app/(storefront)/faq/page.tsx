import type { Metadata } from "next";
import { faqItems, faqCategories } from "@/lib/mock/faq";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ — Ms Weaver",
  description:
    "Answers to common questions about ordering, custom commissions, shipping, and caring for your Ms Weaver piece.",
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="HELP"
        heading="Questions, answered"
        subtitle="If your question is not here, write to us — we reply within 2 business days."
      />

      <Container className="pb-24 md:pb-32 lg:pb-40">
        <div className="mx-auto max-w-3xl">
          {faqCategories.map((category) => {
            const items = faqItems.filter((item) => item.category === category);
            return (
              <section
                key={category}
                aria-labelledby={`faq-cat-${category}`}
                className="mb-16 last:mb-0"
              >
                <h2
                  id={`faq-cat-${category}`}
                  className="mb-6 font-serif text-[40px] font-light leading-[48px] tracking-[-0.015em] text-foreground"
                >
                  {category}
                </h2>
                <Accordion type="multiple" className="border-t border-border">
                  {items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border-border"
                    >
                      <AccordionTrigger className="py-5 text-left text-[16px] font-medium text-foreground hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="pb-5 text-[16px] leading-[26px] text-muted-foreground">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
