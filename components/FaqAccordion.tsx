import { FAQ } from "@/data/site";

/** 네이티브 details/summary: 키보드·스크린리더 기본 지원, JS 불필요 */
export default function FaqAccordion() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((f, i) => (
        <details key={f.q} className="group" open={i === 0}>
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="num text-[15px] text-accent-strong" aria-hidden="true">
              Q{i + 1}
            </span>
            <h2 className="flex-1 text-[19px] font-bold md:text-[22px]">{f.q}</h2>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-[20px] text-text-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pl-10 text-[16px] leading-relaxed text-text-muted md:pl-12">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
