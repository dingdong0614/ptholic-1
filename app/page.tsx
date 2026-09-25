import Image from "next/image";
import Link from "next/link";
import CongestionWidget from "@/components/CongestionWidget";
import Icon from "@/components/Icon";
import { RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG, FLYER, PROMOTION_NOTE, TESTIMONIALS, TIMELINE } from "@/data/site";
import { GALLERY_PHOTOS, UPGRADE_NOTICE, NAMED_EQUIPMENT } from "@/data/facility";
import { PRICING } from "@/data/pricing";
import { TRAINERS } from "@/data/trainers";
import { STOCK, unsplash } from "@/data/stock";
import { won } from "@/lib/format";

// 실사진 (네이버 블로그 게시물 원본)
const P = Object.fromEntries(GALLERY_PHOTOS.map((g) => [g.src.split("/").pop()!.replace(".jpg", ""), g]));

// 트레이너별 대표 이력 2줄 (data/trainers.ts 원문에서 선택)
const HIGHLIGHT: Record<string, string[]> = {
  "kwon-youngmin": ["MR. 경기 보디빌딩 대회 입상", "NASM CES · KKF 케틀벨 지도자"],
  "an-jeongho": ["수원시장배 아마추어 복싱대회 1위", "FISAF 근막통증 재활/교정"],
  "hong-seungbeom": ["MUSA 서울 클래식피지크 통합그랑프리", "NPC 리저널 클래식피지크 입상"],
};

export default function HomePage() {
  const { sns } = SITE_CONFIG;
  const personal = PRICING.tables.find((t) => t.id === "personal")!;
  const duo = PRICING.tables.find((t) => t.id === "duo")!;
  const gym = PRICING.tables.find((t) => t.id === "membership")!;

  return (
    <>
      {/* 1. 매장 실사진 풀블리드 + 전단 스티커 */}
      <section className="hero-photo -mt-16 min-h-[640px] pt-16 md:min-h-[88vh]">
        <div className="hero-img grid grid-cols-1 md:grid-cols-2" aria-hidden="true">
          <div className="relative">
            <Image src={P["facility-3"].src} alt="" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative hidden md:block">
            <Image src={P["facility-1"].src} alt="" fill priority sizes="50vw" className="object-cover" />
          </div>
        </div>
        <p className="sr-only">피티홀릭짐 실제 매장 내부 사진: 프리웨이트존과 케틀벨이 놓인 웨이트존 입구</p>

        <div className="wrap relative flex min-h-[576px] flex-col justify-end pb-10 md:min-h-[calc(88vh-64px)] md:pb-16">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[15px] font-semibold text-text md:text-[17px]">
                수원 율전동 · 성균관대역 도보 3분 · 2층
              </p>
              <h1 className="t-hero mt-3">
                율전동 전문 PT샵,
                <br />
                <span className="text-accent">피티홀릭짐</span>
              </h1>
              <p className="mt-5 max-w-[36rem] text-[17px] text-text md:text-[19px]">
                2021년 상률초 앞 작은 PT샵으로 시작해 지금 자리로 옮겨 왔어요. 평일 새벽 6시부터 밤 12시까지, 쉬는 날 없이
                엽니다.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={sns.reservationUrl} target="_blank" rel="noopener" className="btn btn-primary">
                  <Icon name="calendar" size={18} />
                  네이버로 상담 예약
                </a>
                <Link href="/pricing" className="btn btn-ghost bg-bg/40">
                  가격표 전체
                </Link>
              </div>
            </div>

            <Link href="/pricing" className="flyer block w-full max-w-[400px] p-5 md:p-6" aria-label="이달 특가 자세히 보기">
              <span className="inline-block rounded bg-accent px-2 py-0.5 text-[13px] font-bold text-accent-ink">
                BEST 특가
              </span>
              <span className="mt-3 block num whitespace-nowrap text-[clamp(22px,6vw,30px)] leading-[1.25]">{FLYER.line1}</span>
              <span className="mt-1 block num whitespace-nowrap text-[clamp(22px,6vw,30px)] leading-[1.25] text-accent">{FLYER.line2}</span>
              <span className="mt-3 block text-[13px] text-text-muted">{PROMOTION_NOTE}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 운영 정보 띠 */}
      <div className="border-b border-line bg-bg-alt">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 py-4 text-[15px]">
          <span>
            <span className="text-text-faint">평일</span> <strong className="num">06:00~24:00</strong>
          </span>
          <span>
            <span className="text-text-faint">주말</span> <strong className="num">09:00~17:00</strong>
          </span>
          <span className="font-semibold">연중무휴, 추석·설날도 운영</span>
          <span className="ml-auto hidden md:block">
            <CongestionWidget compact />
          </span>
        </div>
      </div>

      {/* 2. 선생님 */}
      <section className="section" aria-labelledby="q-trainer">
        <div className="wrap">
          <div className="max-w-3xl">
            <h2 id="q-trainer" className="t-h1">
              &ldquo;선생님 경력이
              <br className="md:hidden" /> 어떻게 되세요?&rdquo;
            </h2>
            <p className="mt-4 text-text-muted">
              상담 오시는 분들이 제일 먼저 묻는 질문이에요. 세 명 모두 생활스포츠지도자 2급(보디빌딩)이 있고, 잘하는 분야가
              다릅니다.
            </p>
          </div>

          <ul className="mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 md:mt-14">
            {TRAINERS.map((t, i) => (
              <RevealOnScroll as="li" key={t.slug} delay={i * 0.05}>
                <Link
                  href={`/trainers#trainer-${i}`}
                  className="group grid h-full grid-cols-[120px_1fr] overflow-hidden rounded-[14px] border border-line bg-surface sm:block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ecebec]">
                    <Image
                      src={t.photo}
                      alt={`${t.name} 트레이너`}
                      fill
                      sizes="(max-width: 640px) 120px, 290px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-[26px] sm:text-[32px]">{t.name}</h3>
                    <p className="mt-1 text-[14px] font-bold text-accent-strong sm:text-[15px]">{t.specialty}</p>
                    <ul className="mt-3 space-y-1 text-[14px] text-text-muted sm:text-[15px]">
                      {HIGHLIGHT[t.slug]?.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </ul>
          <Link href="/trainers" className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-text-muted hover:text-accent-strong">
            경력·자격 원문 전체 <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      {/* 3. 가격 */}
      <section className="border-y border-line bg-bg-alt" aria-labelledby="q-price">
        <div className="wrap grid gap-12 py-[var(--section-y)] lg:grid-cols-[1fr_340px]">
          <div>
            <h2 id="q-price" className="t-h1">&ldquo;얼마예요?&rdquo;</h2>
            <p className="mt-4 text-text-muted">숨기는 가격 없어요. 부가세는 별도고, 헬스복·수건은 무료입니다.</p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[340px] border-collapse text-left">
                <caption className="sr-only">PT 가격표</caption>
                <thead>
                  <tr className="border-b border-line-strong text-[14px] text-text-faint">
                    <th scope="col" className="py-3 font-medium">
                      횟수
                    </th>
                    <th scope="col" className="py-3 text-right font-medium">
                      {personal.label} <span className="hidden sm:inline">({personal.desc})</span>
                    </th>
                    <th scope="col" className="py-3 text-right font-medium">
                      {duo.label}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {personal.plans.map((p, i) => (
                    <tr key={p.sessions} className="border-b border-line">
                      <th scope="row" className="py-3.5 text-[16px] font-semibold">
                        {p.sessions}회
                      </th>
                      <td className="num py-3.5 text-right text-[18px] md:text-[22px]">{won(p.price)}</td>
                      <td className="num py-3.5 text-right text-[16px] text-text-muted md:text-[20px]">{won(duo.plans[i].price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              <span className="font-semibold">헬스 이용권</span>
              {gym.plans.map((p) => (
                <span key={p.sessions} className="text-text-muted">
                  {p.sessions}개월 <strong className="num text-text">{won(p.price)}</strong>
                </span>
              ))}
              <span className="text-text-muted">
                개인 락커 <strong className="text-text">월 7,000원</strong>
              </span>
            </div>
            <p className="mt-3 text-[14px] text-text-faint">{PRICING.vatNote}</p>
          </div>
          <figure className="relative hidden overflow-hidden rounded-[14px] lg:block">
            <Image src={P["facility-4"].src} alt={P["facility-4"].alt} fill sizes="340px" className="object-cover" />
          </figure>
        </div>
      </section>

      {/* 4. 기구 */}
      <section className="section" aria-labelledby="q-equip">
        <div className="wrap">
          <h2 id="q-equip" className="t-h1">&ldquo;어떤 기구 있어요?&rdquo;</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div className="grid grid-cols-2 content-start gap-3">
              <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[14px]">
                <Image src={P["facility-6"].src} alt={P["facility-6"].alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image src={P["facility-2"].src} alt={P["facility-2"].alt} fill sizes="(max-width: 1024px) 50vw, 27vw" className="object-cover" />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unsplash(STOCK.kettlebells.id, 800)}
                  alt={STOCK.kettlebells.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-2 right-2 rounded bg-bg/80 px-2 py-0.5 text-[12px] text-text-muted">
                  참고 이미지
                </figcaption>
              </figure>
            </div>

            <div>
              <p className="text-text-muted">
                웨이트존, 프리웨이트존, 유산소존에 기능성 운동존까지 있어요. 블로그에 이름을 올린 기구만 적으면 이 정도입니다.
              </p>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {NAMED_EQUIPMENT.map((e) => (
                  <li key={e} className="flex items-center gap-3 py-3 text-[16px]">
                    <Icon name="dumbbell" size={18} className="shrink-0 text-accent-strong" />
                    {e}
                  </li>
                ))}
              </ul>

              <div className="notice mt-8 p-6 md:p-7">
                <p className="text-[13px] font-semibold text-[#6b6862]">블로그 공지 · {UPGRADE_NOTICE.date}</p>
                <p className="mt-1 text-[18px] font-bold leading-snug">{UPGRADE_NOTICE.title}</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
                  {UPGRADE_NOTICE.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ol>
                <Link href="/facility" className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-bold text-[#b8350c]">
                  시설 사진 더 보기 <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 시간 */}
      <section className="hero-photo" aria-labelledby="q-time">
        <Image src={P["facility-5"].src} alt="" fill sizes="100vw" className="hero-img object-cover" />
        <div className="wrap relative py-[var(--section-y)]">
          <h2 id="q-time" className="t-h1 max-w-2xl">&ldquo;이 시간에 PT 되나요?&rdquo;</h2>
          <div className="mt-8 grid max-w-3xl gap-6 md:grid-cols-2">
            <div>
              <p className="num text-[44px] leading-none md:text-[64px]">06~24시</p>
              <p className="mt-2 text-text-muted">평일 문 여는 시간</p>
            </div>
            <div>
              <p className="num text-[44px] leading-none md:text-[64px]">09~17시</p>
              <p className="mt-2 text-text-muted">주말 · 공휴일은 블로그 공지 확인</p>
            </div>
          </div>
          <p className="mt-8 max-w-xl text-[17px]">
            PT 시간은 선생님마다 달라서 상담 때 맞춰 드려요. 대학원생 회원은 이른 아침에 PT 20회를 받았다고 후기를 남겼어요.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={sns.reservationUrl} target="_blank" rel="noopener" className="btn btn-primary">
              <Icon name="calendar" size={18} />
              상담 시간 잡기
            </a>
            <CongestionWidget />
          </div>
        </div>
      </section>

      {/* 6. 후기 */}
      <section className="section" aria-labelledby="reviews-title">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 id="reviews-title" className="t-h1">
              다녀간 회원들이
              <br />
              남긴 말
            </h2>
            <p className="mt-4 text-text-muted">네이버 예약 리뷰와 회원이 보낸 메시지에서 문장 그대로 옮겼어요.</p>
            <Link href="/reviews" className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-text-muted hover:text-accent-strong">
              후기 전체 <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="space-y-8">
            {[TESTIMONIALS[0], TESTIMONIALS[1], TESTIMONIALS[4]].map((r, i) => (
              <RevealOnScroll key={r.quote} delay={i * 0.04}>
                <figure className={`border-l-4 pl-5 md:pl-7 ${i === 0 ? "border-accent" : "border-line-strong"}`}>
                  <blockquote className={i === 0 ? "text-[21px] font-semibold leading-[1.6] md:text-[25px]" : "text-[17px] leading-[1.75]"}>
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-[14px] text-text-faint">
                    {r.source}
                    {r.trainer && ` · ${r.trainer} 선생님`}
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 연혁 + 오시는 길 */}
      <section className="border-t border-line bg-bg-alt" aria-labelledby="visit-title">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-[560px]">
            <Image src={P["facility-1"].src} alt={P["facility-1"].alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="px-5 py-14 md:px-12 lg:py-20">
            <h2 id="visit-title" className="t-h1">
              성대역에서
              <br />
              걸어서 3분
            </h2>
            <p className="mt-5 text-[18px] font-semibold">{SITE_CONFIG.addressFull}</p>
            <p className="mt-2 text-[15px] text-text-muted">{SITE_CONFIG.booking.note}</p>

            <ol className="mt-8 space-y-3 border-l border-line-strong pl-5">
              {TIMELINE.map((t) => (
                <li key={t.date} className="text-[15px]">
                  <span className="num mr-2 text-accent-strong">{t.date}</span>
                  <span className="text-text-muted">{t.text}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={sns.mapUrl} target="_blank" rel="noopener" className="btn btn-primary">
                <Icon name="pin" size={18} />
                네이버 지도 길찾기
              </a>
              <a href={sns.instagramUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                <Icon name="instagram" size={18} />
                인스타 DM
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
