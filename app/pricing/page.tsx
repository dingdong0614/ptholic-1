import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingTabs from "@/components/PricingTabs";
import GlareCard from "@/components/GlareCard";
import { RevealOnScroll } from "@/components/Reveal";
import { PROMOTIONS } from "@/data/site";
import { won } from "@/lib/format";

export const metadata: Metadata = {
  title: "가격안내",
  description: "피티홀릭짐 개인 PT, 2:1 PT, 헬스장 이용권 가격과 이달의 프로모션을 확인하세요. 성균관대역 도보 3분, 수원 율전동 헬스장.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="가격안내"
        title="회원권 & PT 가격"
        desc="개인 PT, 2:1 PT, 헬스장 이용권 요금과 이달의 프로모션을 확인하세요."
      />
      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid gap-4 sm:grid-cols-2">
            {PROMOTIONS.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.08}>
                <GlareCard className="border border-accent/40 bg-surface p-6">
                  <span className="font-mono text-xs text-accent-strong">{p.badge}</span>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                  <p className="mt-1 font-display text-3xl text-accent-strong">{won(p.price)}</p>
                  <p className="mt-2 text-sm text-text-muted">{p.desc}</p>
                </GlareCard>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-14">
            <PricingTabs />
          </div>
        </div>
      </section>
    </>
  );
}
