import type { Metadata } from "next";
import { STOCK, unsplash } from "@/data/stock";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "문의 · 무료체험 신청",
  description:
    "피티홀릭짐 PT 상담 예약과 무료 체험 신청. 네이버 예약, 인스타그램 DM, 문의 폼. 성균관대역 도보 3분 수원 율전동 헬스장·PT.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { sns, phone } = SITE_CONFIG;
  return (
    <>
      <PageHero
        photo={{ src: unsplash(STOCK.dumbbellRack.id, 1600), stock: true, position: "center 40%" }}
        crumb="문의"
        title="운동이 처음이어도 괜찮아요"
        desc="체력테스트로 지금 몸 상태부터 확인하고, 나에게 맞는 방향을 같이 정해요."
      />
      <section id="trial" className="scroll-mt-20 py-12 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <RevealOnScroll>
            <div>
              <h2 className="t-h2">네이버 예약으로 상담 시간을 먼저 잡아 주세요</h2>
              <p className="mt-4 text-text-muted">{SITE_CONFIG.booking.note}</p>
              <a href={sns.reservationUrl} target="_blank" rel="noopener" className="btn btn-primary mt-7">
                <Icon name="calendar" size={18} />
                네이버로 상담·무료 체험 예약
              </a>

              <ul className="mt-10 divide-y divide-line border-y border-line">
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="flex min-h-[56px] items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-3 font-semibold">
                        <Icon name="phone" /> 전화
                      </span>
                      <span className="text-text-muted">{phone}</span>
                    </a>
                  </li>
                )}
                {sns.kakaoUrl && (
                  <li>
                    <a href={sns.kakaoUrl} target="_blank" rel="noopener" className="flex min-h-[56px] items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-3 font-semibold">
                        <Icon name="message" /> 카카오톡 오픈채팅
                      </span>
                      <Icon name="external" size={16} className="text-text-faint" />
                    </a>
                  </li>
                )}
                <li>
                  <a href={sns.instagramUrl} target="_blank" rel="noopener" className="flex min-h-[56px] items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-3 font-semibold">
                      <Icon name="instagram" /> 인스타그램 DM
                    </span>
                    <span className="text-text-muted">{sns.instagramHandle}</span>
                  </a>
                </li>
                <li>
                  <a href={sns.mapUrl} target="_blank" rel="noopener" className="flex min-h-[56px] items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-3 font-semibold">
                      <Icon name="pin" /> 길찾기
                    </span>
                    <span className="text-text-muted">{SITE_CONFIG.station}</span>
                  </a>
                </li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
