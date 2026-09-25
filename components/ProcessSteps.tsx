import { PROCESS_STEPS } from "@/data/facility";
import { RevealOnScroll } from "@/components/Reveal";

/** 진행 단계: 큰 번호 + 제목 + 한 줄, 좌우 비대칭 배치 */
export default function ProcessSteps() {
  return (
    <ol className="grid gap-4">
      {PROCESS_STEPS.map((s, i) => (
        <RevealOnScroll as="li" key={s.step} delay={i * 0.05}>
          <div
            className={`card grid items-center gap-4 p-6 md:grid-cols-[140px_1fr] md:gap-10 md:p-9 ${
              i === 1 ? "lg:ml-[12%]" : i === 2 ? "lg:ml-[24%]" : ""
            }`}
          >
            <span className="num text-[56px] leading-none text-accent-strong md:text-[88px]" aria-hidden="true">
              {s.step}
            </span>
            <div>
              <h3 className="text-[24px] md:text-[30px]">
                <span className="sr-only">{i + 1}단계. </span>
                {s.title}
              </h3>
              <p className="mt-2 max-w-xl text-text-muted">{s.desc}</p>
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </ol>
  );
}
