"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <div>
      <div role="tablist" aria-label="트레이너 선택" className="flex flex-wrap gap-2 border-b border-line pb-4">
        {TRAINERS.map((trainer, i) => (
          <button
            key={trainer.slug}
            id={`trainer-${i}`}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`border px-5 py-2.5 font-mono text-sm transition-colors ${
              active === i
                ? "border-accent bg-accent text-white"
                : "border-line-strong text-text-muted hover:border-accent-strong hover:text-text"
            }`}
          >
            {trainer.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={t.slug}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 pt-10 md:grid-cols-[340px_1fr]"
        >
          <div className="relative aspect-[4/5] overflow-hidden border border-line">
            <Image src={t.photo} alt={`${t.name} 트레이너`} fill className="object-cover" sizes="340px" />
          </div>

          <div>
            <h2 className="font-display text-3xl">{t.name}</h2>
            <p className="mt-2 text-lg italic text-text-muted">&ldquo;{t.tagline}&rdquo;</p>
            <span className="mt-3 inline-block font-mono text-xs text-accent-strong">{t.specialty}</span>
            <p className="mt-5 leading-relaxed text-text-muted">{t.teachingStyle}</p>

            <p className="mt-8 font-mono text-xs tracking-[0.14em] text-text-faint">경력</p>
            <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
              {t.career.map((c) => (
                <li key={c} className="border-b border-line/60 pb-1.5">
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-xs tracking-[0.14em] text-text-faint">자격사항</p>
            <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
              {t.certs.map((c) => (
                <li key={c} className="border-b border-line/60 pb-1.5">
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-xs tracking-[0.14em] text-text-faint">영상</p>
            {t.videoUrl ? (
              <div className="mt-3 aspect-video overflow-hidden border border-line">
                <iframe src={t.videoUrl} title={`${t.name} 트레이너 영상`} loading="lazy" allowFullScreen className="h-full w-full" />
              </div>
            ) : (
              <p className="mt-3 text-sm text-text-faint">트레이너 영상은 준비 중입니다.</p>
            )}

            <p className="mt-8 font-mono text-xs tracking-[0.14em] text-text-faint">후기</p>
            {t.reviews.length ? (
              t.reviews.map((r) => (
                <p key={r} className="mt-3 text-sm italic text-text-muted">
                  &ldquo;{r}&rdquo;
                </p>
              ))
            ) : (
              <p className="mt-3 text-sm text-text-faint">이 트레이너에 대한 후기는 준비 중입니다.</p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
