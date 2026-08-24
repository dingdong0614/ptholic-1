import { RevealOnScroll } from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  action,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <RevealOnScroll>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-accent-strong">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">{title}</h2>
          {desc && <p className="mt-3 max-w-xl text-text-muted">{desc}</p>}
        </div>
        {action}
      </div>
    </RevealOnScroll>
  );
}
