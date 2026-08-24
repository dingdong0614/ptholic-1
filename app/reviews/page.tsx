import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlareCard from "@/components/GlareCard";
import { RevealOnScroll } from "@/components/Reveal";
import { TESTIMONIALS } from "@/data/site";

export const metadata: Metadata = {
  title: "회원후기",
  description: "피티홀릭짐 실제 회원들의 PT 후기를 확인하세요. 성균관대역 도보 3분, 수원 율전동 헬스장.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero crumb="회원후기" title="실제 회원 후기" desc="피티홀릭짐과 함께한 회원들의 이야기입니다." />
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((r, i) => (
            <RevealOnScroll key={r.quote} delay={i * 0.08}>
              <GlareCard className="h-full border border-line bg-surface p-7">
                <p className="text-text-muted leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <p className="mt-4 font-mono text-xs text-text-faint">{r.meta}</p>
              </GlareCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
