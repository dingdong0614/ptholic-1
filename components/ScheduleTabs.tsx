"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRAINERS, SCHEDULE_DAYS } from "@/data/trainers";

export default function ScheduleTabs() {
  const [active, setActive] = useState(0);
  const t = TRAINERS[active];

  return (
    <div>
      <div role="tablist" aria-label="트레이너 선택" className="flex flex-wrap gap-2 border-b border-line pb-4">
        {TRAINERS.map((trainer, i) => (
          <button
            key={trainer.slug}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 pt-8 md:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <p className="text-lg italic text-text-muted">&ldquo;{t.tagline}&rdquo;</p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">{t.teachingStyle}</p>
          </div>
          <table className="w-full border-collapse font-mono text-sm">
            <tbody>
              {SCHEDULE_DAYS.map((day) => (
                <tr key={day} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 text-left font-normal text-text-faint">
                    {day}
                  </th>
                  <td className="py-3 text-text-muted">{t.schedule[day] || "협의 후 안내"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>

      <p className="mt-8 text-xs text-text-faint">
        ※ 실시간 예약 가능 여부는 상담 시 안내드립니다. 정확한 시간은 담당 트레이너 확인 후 업데이트될 예정입니다.
      </p>
    </div>
  );
}
