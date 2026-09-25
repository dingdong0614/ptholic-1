"use client";

import { useState } from "react";
import { TRAINERS, SCHEDULE_DAYS } from "@/data/trainers";

export default function ScheduleTabs() {
  const [active, setActive] = useState(0);
  const t = TRAINERS[active];

  function onKey(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : TRAINERS.length - 1)) % TRAINERS.length;
    setActive(next);
    document.getElementById(`schedule-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="트레이너 선택" className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" onKeyDown={onKey}>
        {TRAINERS.map((trainer, i) => (
          <button
            key={trainer.slug}
            id={`schedule-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls="schedule-panel"
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
        id="schedule-panel"
        role="tabpanel"
        aria-labelledby={`schedule-tab-${active}`}
        className="grid gap-8 pt-8 md:grid-cols-[1fr_1.2fr] md:gap-12"
      >
        <div>
          <p className="font-display text-[20px] font-bold md:text-[24px]">&ldquo;{t.tagline}&rdquo;</p>
          <p className="mt-4 text-[16px] leading-relaxed text-text-muted">{t.teachingStyle}</p>
        </div>
        <table className="w-full border-collapse text-[16px]">
          <caption className="sr-only">{t.name} 트레이너 요일별 가능 시간</caption>
          <tbody>
            {SCHEDULE_DAYS.map((day) => (
              <tr key={day} className="border-b border-line">
                <th scope="row" className="w-16 py-3.5 text-left font-semibold text-text-faint">
                  {day}
                </th>
                <td className="py-3.5 text-text-muted">{t.schedule[day] || "상담 시 안내"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-[14px] text-text-faint">
        실시간 예약 가능 여부는 상담 때 안내드립니다. 요일별 정확한 시간은 담당 트레이너 확인 후 업데이트합니다.
      </p>
    </div>
  );
}
