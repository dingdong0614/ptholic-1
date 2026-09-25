import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { RevealOnScroll } from "@/components/Reveal";
import { GALLERY_PHOTOS, EQUIPMENT_ZONES, UPGRADE_NOTICE, NAMED_EQUIPMENT } from "@/data/facility";
import { STOCK, unsplash } from "@/data/stock";

export const metadata: Metadata = {
  title: "시설소개",
  description:
    "2026년 8월 리뉴얼한 피티홀릭짐 시설. 웨이트존, 프리웨이트존, 기능성 운동존, 유산소존, 맨몸 운동 공간. 성균관대역 도보 3분 수원 율전동 헬스장.",
  alternates: { canonical: "/facility" },
};

// 벤토 배치: 첫 장은 크게, 나머지는 크기를 섞어 공간감이 보이게
const LAYOUT = ["b-wide b-tall", "", "", "b-half", "b-half", ""];

export default function FacilityPage() {
  return (
    <>
      <PageHero
        photo={{ src: "/assets/img/facility/facility-2.jpg" }}
        crumb="시설소개"
        title="다시 짠 동선, 새로 깐 바닥"
        desc="8월 1~2일 주말에 시설 전체를 정비하고 기구를 크게 옮겼어요. 아래 사진은 전부 실제 매장입니다."
      />

      <section className="py-12 md:py-20">
        <div className="wrap">
          <div className="bento">
            {GALLERY_PHOTOS.slice(0, 5).map((g, i) => (
              <RevealOnScroll key={g.src} className={LAYOUT[i]} delay={(i % 3) * 0.04}>
                <figure className={`photo-card h-full ${i === 0 ? "min-h-[280px] lg:min-h-[480px]" : "min-h-[220px]"}`}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    className="object-cover"
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                  />
                  <div className="photo-shade" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[14px] font-semibold text-text">{g.alt}</figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="notice p-6 md:p-9">
              <p className="text-[13px] font-semibold text-[#6b6862]">블로그 공지 · {UPGRADE_NOTICE.date}</p>
              <h2 className="mt-1 font-display text-[26px] !text-[#1b1b1c] md:text-[32px]">{UPGRADE_NOTICE.title}</h2>
              <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-[16px] leading-relaxed">
                {UPGRADE_NOTICE.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
              <p className="mt-5 text-[15px] leading-relaxed text-[#3d3b37]">{UPGRADE_NOTICE.extra}</p>
            </div>
            <div>
              <h2 className="t-h2">이름이 알려진 기구</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {NAMED_EQUIPMENT.map((e) => (
                  <li key={e} className="py-3 text-[17px]">
                    {e}
                  </li>
                ))}
              </ul>
              <figure className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[14px] bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unsplash(STOCK.kettlebells.id, 1000)}
                  alt={STOCK.kettlebells.alt}
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-2 right-2 rounded bg-bg/80 px-2 py-0.5 text-[12px] text-text-muted">
                  참고 이미지
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="t-h2">운동 구역</h2>
              <p className="mt-4 text-text-muted">구역별 세부 기구 목록은 정리되는 대로 업데이트합니다.</p>
              <figure className="photo-card mt-8 hidden aspect-[4/3] lg:block">
                <Image src={GALLERY_PHOTOS[5].src} alt={GALLERY_PHOTOS[5].alt} fill className="object-cover" sizes="33vw" />
              </figure>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {EQUIPMENT_ZONES.map((z) => (
                <div key={z.name} className="grid gap-2 py-6 md:grid-cols-[180px_1fr] md:gap-6">
                  <dt className="font-display text-[20px] font-black text-accent-strong">{z.name}</dt>
                  <dd className="text-[16px] leading-relaxed text-text-muted">{z.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
