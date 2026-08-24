import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "문의 · 무료체험 신청",
  description: "피티홀릭짐 PT 상담 문의 및 무료 체험 신청. 성균관대역 도보 3분, 수원 율전동 헬스장.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="문의"
        title="문의 · 무료 체험 신청"
        desc="운동이 처음이어도 괜찮습니다. 체력테스트로 시작해 나에게 맞는 방향을 먼저 찾아보세요."
      />
      <section id="trial" className="py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-accent-strong">GET STARTED</p>
              <h2 className="mt-2 font-display text-3xl">무료 체험 · 상담 신청</h2>
              <p className="mt-4 text-text-muted">
                네이버 예약을 통해 바로 상담 일정을 잡거나, 오른쪽 문의 폼으로 편하게 남겨주세요.
              </p>
              <a
                href={SITE_CONFIG.sns.reservationUrl}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-block bg-accent px-7 py-3.5 font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                지금 무료 체험 신청하기
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
