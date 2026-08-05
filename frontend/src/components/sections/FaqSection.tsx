import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/common/Reveal";
import SectionHeader from "@/components/common/SectionHeader";
import Section from "@/components/common/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqSchema, type FaqEntry } from "@/lib/schema";

interface FaqSectionProps {
  items: readonly FaqEntry[];
  label?: string;
  title?: string;
  description?: string;
  id?: string;
  tone?: "default" | "muted" | "card";
  /**
   * Emit FAQPage structured data. Only one FAQPage block should exist per
   * URL, so set this to false if the page already renders another FAQ.
   */
  withSchema?: boolean;
}

/**
 * Answer-engine optimised FAQ block.
 *
 * The questions are phrased the way people actually ask them, and each answer
 * opens with a complete, self-contained sentence — so an AI assistant or a
 * featured snippet can lift a single answer without losing meaning.
 */
const FaqSection = ({
  items,
  label = "FAQ",
  title = "Frequently Asked Questions",
  description,
  id = "faq",
  tone = "muted",
  withSchema = true,
}: FaqSectionProps) => (
  <Section id={id} tone={tone} bordered>
    {withSchema && <JsonLd data={faqSchema([...items])} />}

    <SectionHeader label={label} title={title} description={description} centered />

    <Reveal className="mx-auto max-w-3xl">
      <Accordion type="single" collapsible className="w-full space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`item-${index}`}
            className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-xs transition-colors data-[state=open]:border-primary/30"
          >
            <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  </Section>
);

export default FaqSection;
