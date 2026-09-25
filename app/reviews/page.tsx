import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import { RevealOnScroll } from "@/components/Reveal";
import { SITE_CONFIG, TESTIMONIALS } from "@/data/site";

export const metadata: Metadata = {
  title: "회원후기",
  description:
    "피티홀릭짐 실제 회원 PT 후기. 네이버 예약 방문자 리뷰 원문 발췌. 성균관대역 도보 3분 수원 율전동 PT·헬스장.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const [first, ...rest] = TESTIMONIALS;
  return (
    <>
      <PageHero
        photo={{ src: "/assets/img/facility/facility-2.jpg" }}
        crumb="회원후기"
        title="회원 후기"
        desc="네이버 예약 방문자 리뷰와 PT를 마친 회원이 보낸 메시지에서 문장을 고치지 않고 옮겼습니다."
      />
      <section className="py-12 md:py-20">
        <div className="wrap">
          <RevealOnScroll>
            <figure className="card p-7 md:p-12">
              <blockquote className="max-w-4xl font-display text-[24px] font-bold leading-[1.5] md:text-[34px]">
                &ldquo;{first.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-[15px] text-text-faint">{first.source}</figcaption>
            </figure>
          </RevealOnScroll>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {rest.map((r, i) => (
              <RevealOnScroll key={r.quote} delay={(i % 2) * 0.05}>
                <figure className="card flex h-full flex-col justify-between p-6 md:p-8">
                  <blockquote className="text-[17px] leading-[1.8]">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-[14px] text-text-faint">
                    {r.source}
                    {r.trainer && ` · 담당 ${r.trainer} 트레이너`}
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
            <p className="text-text-muted">더 많은 후기는 네이버 플레이스와 블로그에서 볼 수 있어요.</p>
            <div className="flex flex-wrap gap-3">
              <a href={SITE_CONFIG.sns.blogUrl} target="_blank" rel="noopener" className="btn btn-ghost">
                블로그 후기 보기 <Icon name="external" size={16} />
              </a>
              <a href={SITE_CONFIG.sns.reservationUrl} target="_blank" rel="noopener" className="btn btn-primary">
                <Icon name="calendar" size={18} />
                나도 상담 예약
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
