import { PRICING } from "@/data/pricing";
import { won } from "@/lib/format";
import { RevealOnScroll } from "@/components/Reveal";

/**
 * 가격표 (data/pricing.ts). 탭으로 숨기지 않고 세 종류를 한 번에 보여준다.
 * 회당/월 환산가는 표의 금액을 횟수로 나눈 계산값(원 단위 반올림).
 */
export default function PricingTabs() {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        {PRICING.tables.map((t, ti) => {
          const perLabel = t.plans[0].unitLabel === "개월" ? "월" : "회당";
          return (
            <RevealOnScroll key={t.id} delay={ti * 0.05}>
              <section aria-labelledby={`price-${t.id}`} className={`card h-full p-6 md:p-7 ${ti === 0 ? "border-accent/50" : ""}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 id={`price-${t.id}`} className="text-[24px]">
                    {t.label}
                  </h2>
                  <span className="text-[14px] text-text-faint">{t.desc}</span>
                </div>
                <table className="mt-5 w-full border-collapse text-left">
                  <caption className="sr-only">{t.label} 가격표</caption>
                  <thead>
                    <tr className="text-[13px] text-text-faint">
                      <th scope="col" className="pb-2 font-medium">
                        구성
                      </th>
                      <th scope="col" className="pb-2 text-right font-medium">
                        금액
                      </th>
                      <th scope="col" className="pb-2 text-right font-medium">
                        {perLabel}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.plans.map((p) => (
                      <tr key={p.sessions} className="border-t border-line">
                        <th scope="row" className="py-3.5 text-[16px] font-semibold">
                          {p.sessions}
                          {p.unitLabel ?? "회"}
                        </th>
                        <td className="num py-3.5 text-right text-[19px]">{won(p.price)}</td>
                        <td className="py-3.5 text-right text-[14px] text-text-muted">
                          {won(Math.round(p.price / p.sessions))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </RevealOnScroll>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {PRICING.extras.map((e) => (
          <span key={e.label} className="rounded-full border border-line-strong px-4 py-2 text-[15px] text-text-muted">
            {e.label} <strong className="text-text">{e.value}</strong>
          </span>
        ))}
        <span className="text-[14px] text-text-faint">{PRICING.vatNote}</span>
      </div>
    </div>
  );
}
