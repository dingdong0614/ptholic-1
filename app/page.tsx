import Image from "next/image";
import Link from "next/link";
import BeamsBackground from "@/components/BeamsBackground";
import CongestionWidget from "@/components/CongestionWidget";
import GlareCard from "@/components/GlareCard";
import SectionHeading from "@/components/SectionHeading";
import { RevealHeading, RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG } from "@/data/site";
import { GALLERY_PHOTOS } from "@/data/facility";
import { TRAINERS } from "@/data/trainers";

const BADGES = [
  {
    label: "성균관대역 도보 3분",
    icon: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    ),
  },
  {
    label: "평일 06:00–24:00",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.59 4.24 4.24-1.41 1.41L11 13V6h2z" />,
  },
  {
    label: "주말 09:00–17:00",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.59 4.24 4.24-1.41 1.41L11 13V6h2z" />,
  },
  {
    label: "경력 10년+ 국가공인 트레이너",
    icon: <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4z" />,
  },
];

const FEATURES = [
  {
    idx: "01",
    title: "체력테스트 기반 설계",
    desc: "등록 전 체력 수준과 신체 밸런스를 측정해, 개인에게 꼭 맞는 운동 프로그램을 설계합니다.",
  },
  {
    idx: "02",
    title: "생활패턴 맞춤 식사 관리",
    desc: "일상 패턴을 먼저 파악한 뒤, 무리 없이 실천 가능한 식사 관리 방향을 함께 잡습니다.",
  },
  {
    idx: "03",
    title: "해부학 근거 자세 코칭",
    desc: "해부학적 근거를 바탕으로 부상 위험을 낮추고, 정확한 자세로 운동 효율을 높입니다.",
  },
];

const EXPLORE = [
  { idx: "01", href: "/pricing", title: "가격안내", desc: "개인 PT · 2:1 PT · 헬스장 이용권 요금과 이달의 프로모션" },
  { idx: "02", href: "/facility", title: "시설소개", desc: "최근 리뉴얼한 트레이닝 공간과 기구 존 안내" },
  { idx: "03", href: "/trainers", title: "트레이너", desc: "3인의 전문 트레이너 경력과 자격사항" },
  { idx: "04", href: "/process", title: "진행방식 · 시간표", desc: "체력테스트부터 자세 코칭까지, 트레이너별 가능 시간" },
  { idx: "05", href: "/reviews", title: "회원후기", desc: "실제 회원들이 남긴 생생한 후기" },
  { idx: "06", href: "/location", title: "오시는길", desc: "성균관대역 도보 3분, 지도와 SNS 채널" },
  { idx: "07", href: "/faq", title: "FAQ", desc: "주차, 환불, 예약 등 자주 묻는 질문" },
  { idx: "08", href: "/contact", title: "문의 · 무료체험", desc: "PT 상담 문의와 무료 체험 신청" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <BeamsBackground />
        <div className="absolute inset-0">
          <Image
            src={SITE_CONFIG.heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </div>
        <div className="wrap relative py-24 md:py-36">
          <RevealOnScroll>
            <div className="mb-6 inline-block">
              <CongestionWidget />
            </div>
          </RevealOnScroll>

          <p className="font-mono text-xs tracking-[0.16em] text-accent-strong">
            SUWON YULJEON-DONG · PERSONAL TRAINING
          </p>
          <RevealHeading
            as="h1"
            text="근거 있는 몸, 피티홀릭짐에서 만듭니다."
            className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl"
          />
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 max-w-xl text-text-muted">
              체력테스트 기반 개인 맞춤 프로그램, 생활패턴에 맞춘 식사 관리, 해부학적 근거로 설계하는 자세
              코칭까지 — 성균관대역 도보 3분 거리에서 시작하세요.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 border border-line-strong px-3 py-1.5 font-mono text-xs text-text-muted"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="text-accent-strong">
                    {b.icon}
                  </svg>
                  {b.label}
                </span>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact#trial"
                className="bg-accent px-7 py-3.5 font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                무료 체험 · 상담 신청
              </Link>
              <a
                href={SITE_CONFIG.sns.reservationUrl}
                target="_blank"
                rel="noopener"
                className="border border-line-strong px-7 py-3.5 text-text transition-colors hover:border-accent"
              >
                네이버 예약 바로가기
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <SectionHeading eyebrow="WHY PT-HOLIC" title="3가지 기준으로 설계하는 운동" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <RevealOnScroll key={f.idx} delay={i * 0.08}>
                <GlareCard className="h-full border border-line bg-surface p-7">
                  <span className="font-mono text-sm text-accent-strong">{f.idx}</span>
                  <h3 className="mt-3 font-display text-xl">{f.title}</h3>
                  <p className="mt-3 text-sm text-text-muted">{f.desc}</p>
                </GlareCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY PREVIEW */}
      <section className="border-y border-line bg-bg-alt py-20 md:py-28">
        <div className="wrap">
          <SectionHeading
            eyebrow="FACILITY"
            title="리뉴얼된 트레이닝 공간"
            action={
              <Link href="/facility" className="font-mono text-sm text-text-muted hover:text-accent-strong">
                시설 더보기 →
              </Link>
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            {GALLERY_PHOTOS.slice(0, 3).map((g, i) => (
              <RevealOnScroll key={g.src} delay={i * 0.06} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <GlareCard className="relative h-full min-h-[160px] overflow-hidden border border-line md:min-h-[220px]">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </GlareCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS PREVIEW */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <SectionHeading
            eyebrow="TRAINERS"
            title="피티홀릭짐 트레이너"
            action={
              <Link href="/trainers" className="font-mono text-sm text-text-muted hover:text-accent-strong">
                트레이너 더보기 →
              </Link>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TRAINERS.map((t, i) => (
              <RevealOnScroll key={t.slug} delay={i * 0.08}>
                <Link href={`/trainers#trainer-${i}`}>
                  <GlareCard className="border border-line bg-surface">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={t.photo}
                        alt={`${t.name} 트레이너`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg">{t.name}</h3>
                      <p className="mt-1 text-sm text-text-muted">{t.specialty}</p>
                    </div>
                  </GlareCard>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="border-t border-line bg-bg-alt py-20 md:py-28">
        <div className="wrap">
          <SectionHeading eyebrow="EXPLORE" title="피티홀릭짐 둘러보기" />
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group bg-bg-alt p-6 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-xs text-accent-strong">{e.idx}</span>
                <h3 className="mt-3 font-display text-lg">{e.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{e.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
