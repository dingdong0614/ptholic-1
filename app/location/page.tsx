import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import { RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "오시는길",
  description:
    "피티홀릭짐 위치. 경기도 수원시 장안구 서부로2135번길 30 2층, 성균관대역(성대역) 도보 3분. 율전동·천천동 헬스장·PT. 운영시간과 상담 예약 안내.",
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  const { sns, hours, phone } = SITE_CONFIG;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.mapQuery)}&output=embed`;

  return (
    <>
      <PageHero
        photo={{ src: "/assets/img/facility/facility-1.jpg" }}
        crumb="오시는길"
        title="성균관대역에서 걸어서 3분"
        desc="율전동 서부로2135번길, 건물 2층입니다. 오시기 전에 상담 예약을 먼저 잡아 주세요."
      />
      <section className="py-12 md:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <RevealOnScroll>
            <div>
              <h2 className="eyebrow">주소</h2>
              <p className="mt-3 text-[20px] font-semibold leading-snug">{SITE_CONFIG.addressFull}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-strong">
                <Icon name="pin" size={16} />
                {SITE_CONFIG.station}
              </p>

              <h2 className="eyebrow mt-10">운영시간</h2>
              <ul className="mt-3 space-y-1 text-[18px] font-semibold">
                <li>{hours.weekday}</li>
                <li>{hours.weekend}</li>
              </ul>
              <p className="mt-2 text-[15px] text-text-muted">{hours.notice}</p>

              <h2 className="eyebrow mt-10">상담 예약</h2>
              <p className="mt-3 text-[15px] text-text-muted">{SITE_CONFIG.booking.note}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={sns.reservationUrl} target="_blank" rel="noopener" className="btn btn-primary">
                  <Icon name="calendar" size={18} />
                  네이버 예약
                </a>
                {phone && (
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="btn btn-ghost">
                    <Icon name="phone" size={18} />
                    {phone}
                  </a>
                )}
                {sns.kakaoUrl && (
                  <a href={sns.kakaoUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                    <Icon name="message" size={18} />
                    카카오톡 오픈채팅
                  </a>
                )}
                <a href={sns.instagramUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                  <Icon name="instagram" size={18} />
                  {sns.instagramHandle}
                </a>
                <a href={sns.blogUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                  네이버 블로그
                </a>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <div className="overflow-hidden rounded-[14px] border border-line">
              <iframe
                title="피티홀릭짐 위치 지도"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[320px] w-full md:h-[440px]"
              />
              <a
                href={sns.mapUrl}
                target="_blank"
                rel="noopener"
                className="flex min-h-[52px] items-center justify-center gap-2 bg-accent px-5 text-[16px] font-bold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                <Icon name="pin" size={18} />
                네이버 지도에서 길찾기
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
