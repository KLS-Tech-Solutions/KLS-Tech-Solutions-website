import Reveal from "@/components/common/Reveal";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: readonly ProcessStep[];
}

/**
 * Numbered delivery process.
 *
 * The connecting rule is drawn behind the number badges on large screens to
 * signal sequence. It is purely decorative, so it is hidden from assistive
 * technology — the ordered list already conveys the sequence semantically.
 */
const ProcessSteps = ({ steps }: ProcessStepsProps) => (
  <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
    {/* Connector rule, desktop only. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
    />

    {steps.map((item, index) => (
      <Reveal as="li" key={item.step} delay={index * 90} className="relative">
        <div className="flex flex-col items-start lg:items-center lg:text-center">
          <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-card text-lg font-bold text-primary shadow-soft">
            {item.step}
          </span>
          <h3 className="heading-card mb-2 text-foreground">{item.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      </Reveal>
    ))}
  </ol>
);

export default ProcessSteps;
