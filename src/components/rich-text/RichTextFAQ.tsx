import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqBlock } from "@/lib/mock/journal";

interface RichTextFAQProps {
  block: FaqBlock;
}

export function RichTextFAQ({ block }: RichTextFAQProps) {
  return (
    <div className="my-10 border-t border-border">
      <Accordion type="multiple">
        {block.items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
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
    </div>
  );
}
