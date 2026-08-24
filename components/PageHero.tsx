import Link from "next/link";
import BeamsBackground from "@/components/BeamsBackground";
import { RevealHeading, RevealOnScroll } from "@/components/Reveal";

export default function PageHero({
  crumb,
  title,
  desc,
}: {
  crumb: string;
  title: string;
  desc: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line py-20 md:py-28">
      <BeamsBackground />
      <div className="wrap relative">
        <RevealOnScroll>
          <p className="font-mono text-xs text-text-faint">
            <Link href="/" className="hover:text-text-muted">
              홈
            </Link>{" "}
            / {crumb}
          </p>
        </RevealOnScroll>
        <RevealHeading as="h1" text={title} className="mt-4 max-w-3xl font-display text-4xl md:text-5xl" />
        <RevealOnScroll delay={0.15}>
          <p className="mt-5 max-w-xl text-text-muted">{desc}</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
