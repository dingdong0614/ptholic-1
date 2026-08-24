import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "오시는길",
  description: "피티홀릭짐 위치 안내. 경기도 수원시 장안구 서부로2135번길 30, 성균관대역 도보 3분. 인스타그램, 네이버 블로그, 네이버 예약 링크.",
};

export default function LocationPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.mapQuery)}&output=embed`;

  return (
    <>
      <PageHero crumb="오시는길" title="오시는 길 & 연락" desc="성균관대역 도보 3분 거리에 있습니다." />
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <div>
              <p className="text-lg text-text">{SITE_CONFIG.addressFull}</p>
              <p className="mt-2 font-mono text-sm text-accent-strong">📍 {SITE_CONFIG.station}</p>

              <ul className="mt-8 space-y-2 text-text-muted">
                <li>{SITE_CONFIG.hours.weekday}</li>
                <li>{SITE_CONFIG.hours.weekend}</li>
                <li className="text-sm text-text-faint">{SITE_CONFIG.hours.notice}</li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.sns.instagramUrl}
                  target="_blank"
                  rel="noopener"
                  className="border border-line-strong px-5 py-3 text-sm text-text transition-colors hover:border-accent-strong"
                >
                  인스타그램 {SITE_CONFIG.sns.instagramHandle}
                </a>
                <a
                  href={SITE_CONFIG.sns.blogUrl}
                  target="_blank"
                  rel="noopener"
                  className="border border-line-strong px-5 py-3 text-sm text-text transition-colors hover:border-accent-strong"
                >
                  네이버 블로그
                </a>
                <a
                  href={SITE_CONFIG.sns.reservationUrl}
                  target="_blank"
                  rel="noopener"
                  className="bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                >
                  네이버 예약
                </a>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="border border-line">
              <iframe
                title="피티홀릭짐 위치 지도"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full"
              />
              <a
                href={SITE_CONFIG.sns.mapUrl}
                target="_blank"
                rel="noopener"
                className="block bg-accent px-5 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                📍 네이버 지도에서 길찾기
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
