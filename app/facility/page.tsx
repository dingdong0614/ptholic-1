import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import GlareCard from "@/components/GlareCard";
import { RevealOnScroll } from "@/components/Reveal";
import { GALLERY_PHOTOS, EQUIPMENT_ZONES } from "@/data/facility";

export const metadata: Metadata = {
  title: "시설소개",
  description: "최근 리뉴얼한 피티홀릭짐 트레이닝 시설을 확인하세요. 웨이트존, 프리웨이트존, 유산소존 안내. 성균관대역 도보 3분, 수원 율전동 헬스장.",
};

export default function FacilityPage() {
  return (
    <>
      <PageHero crumb="시설소개" title="최근 리뉴얼한 시설" desc="기구 재배치와 바닥 교체를 마친 새로운 트레이닝 환경입니다." />

      <section className="py-16 md:py-24">
        <div className="wrap">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY_PHOTOS.map((g, i) => (
              <RevealOnScroll key={g.src} delay={(i % 3) * 0.08}>
                <GlareCard className="relative aspect-[4/3] overflow-hidden border border-line">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </GlareCard>
              </RevealOnScroll>
            ))}
          </div>

          <h3 className="mt-20 font-display text-2xl">기구 존 안내</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {EQUIPMENT_ZONES.map((z, i) => (
              <RevealOnScroll key={z.name} delay={i * 0.06}>
                <div className="h-full border border-line bg-surface p-6">
                  <h4 className="font-display text-lg text-accent-strong">{z.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{z.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
