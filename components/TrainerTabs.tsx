"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TRAINERS } from "@/data/trainers";

export default function TrainerTabs() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const match = window.location.hash.match(/^#trainer-(\d+)$/);
    if (match && TRAINERS[Number(match[1])]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- URL 해시는 마운트 시점에만 읽을 수 있음
      setActive(Number(match[1]));
    }
  }, []);

  const t = TRAINERS[active];

  function onKey(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : TRAINERS.length - 1)) % TRAINERS.length;
    setActive(next);
    document.getElementById(`trainer-${next}`)?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="트레이너 선택" className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" onKeyDown={onKey}>
        {TRAINERS.map((trainer, i) => (
          <button
            key={trainer.slug}
            id={`trainer-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls="trainer-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-[48px] rounded-full border px-5 text-[16px] font-bold transition-colors ${
              active === i
                ? "border-accent bg-accent text-accent-ink"
                : "border-line-strong text-text-muted hover:border-accent-strong hover:text-text"
            }`}
          >
            {trainer.name}
          </button>
        ))}
      </div>

      <div
        key={t.slug}
        id="trainer-panel"
        role="tabpanel"
        aria-labelledby={`trainer-${active}`}
        className="grid gap-8 pt-10 md:grid-cols-[300px_1fr] md:gap-12"
      >
        <div>
          <div className="photo-card relative aspect-[4/5] bg-[#ecebec]">
            <Image src={t.photo} alt={`${t.name} 트레이너 프로필 사진`} fill className="object-cover object-top" sizes="300px" />
          </div>
          <p className="mt-4 text-[14px] font-bold text-accent-strong">{t.specialty}</p>
        </div>

        <div>
          <h2 className="t-h1">{t.name}</h2>
          <p className="mt-3 font-display text-[20px] font-bold text-text-muted md:text-[24px]">&ldquo;{t.tagline}&rdquo;</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-text-muted">{t.teachingStyle}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="eyebrow">경력</h3>
              <ul className="mt-3 text-[15px] text-text-muted">
                {t.career.map((c) => (
                  <li key={c} className="border-b border-line py-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">자격사항</h3>
              <ul className="mt-3 text-[15px] text-text-muted">
                {t.certs.map((c) => (
                  <li key={c} className="border-b border-line py-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {t.videoUrl && (
            <div className="mt-10">
              <h3 className="eyebrow">영상</h3>
              <div className="mt-3 aspect-video overflow-hidden rounded-[14px] border border-line">
                <iframe src={t.videoUrl} title={`${t.name} 트레이너 영상`} loading="lazy" allowFullScreen className="h-full w-full" />
              </div>
            </div>
          )}

          {t.reviews.length > 0 && (
            <div className="mt-10">
              <h3 className="eyebrow">회원 후기</h3>
              {t.reviews.map((r) => (
                <figure key={r} className="card mt-3 p-6">
                  <blockquote className="text-[16px] leading-[1.75]">&ldquo;{r}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-[14px] text-text-faint">네이버 예약 방문자 리뷰</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
