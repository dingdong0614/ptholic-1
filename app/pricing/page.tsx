import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingTabs from "@/components/PricingTabs";
import Icon from "@/components/Icon";
import { RevealOnScroll } from "@/components/Reveal";
import { PROMOTIONS, PROMOTION_NOTE, SITE_CONFIG } from "@/data/site";
import { won } from "@/lib/format";

export const metadata: Metadata = {
  title: "가격안내",
  description:
    "피티홀릭짐 개인 PT, 2:1 PT, 헬스장 이용권 가격과 이달의 특가. 성균관대역 도보 3분, 수원 율전동 헬스장·PT.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        photo={{ src: "/assets/img/facility/facility-4.jpg" }}
        crumb="가격안내"
        title="피티홀릭짐 가격표"
        desc="PT는 횟수가 늘수록 회당 가격이 내려가요. 부가세 별도, 헬스복·수건은 무료."
      />

      <section className="py-12 md:py-20">
        <div className="wrap">
          <h2 className="eyebrow">이달의 특가</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {PROMOTIONS.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.05}>
                <div className="card relative h-full overflow-hidden border-accent/50 p-6 md:p-8">
                  <span className="inline-block rounded-full border border-accent/60 px-3 py-1 text-[13px] font-bold text-accent-strong">
                    {p.badge}
                  </span>
                  <h3 className="mt-4 text-[26px] md:text-[30px]">{p.title}</h3>
                  <p className="num mt-2 text-[40px] leading-none md:text-[52px]">{won(p.price)}</p>
                  <p className="mt-3 text-[15px] text-text-muted">{p.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-text-faint">{PROMOTION_NOTE}</p>

          <h2 className="eyebrow mt-16">정가표</h2>
          <div className="mt-4">
            <PricingTabs />
          </div>

          <div className="card mt-14 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-[22px] font-bold md:text-[26px]">어떤 구성이 맞을지 모르겠다면</p>
              <p className="mt-1 text-text-muted">체력테스트 후 목표와 일정에 맞춰 추천해 드려요. {SITE_CONFIG.booking.note}</p>
            </div>
            <a
              href={SITE_CONFIG.sns.reservationUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary shrink-0"
            >
              <Icon name="calendar" size={18} />
              상담 예약하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
