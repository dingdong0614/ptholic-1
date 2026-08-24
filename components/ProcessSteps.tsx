"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/data/facility";
import { usePrefersReducedMotion } from "@/lib/use-media";

export default function ProcessSteps() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !rootRef.current || !lineRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-[19px]">
        <div ref={lineRef} className="h-full w-full origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
      </div>

      <div className="flex flex-col gap-12">
        {PROCESS_STEPS.map((s) => (
          <div key={s.step} className="relative pl-12 md:pl-16">
            <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center border border-line-strong bg-bg font-mono text-xs text-accent-strong md:h-10 md:w-10">
              {s.step}
            </span>
            <h3 className="font-display text-2xl">{s.title}</h3>
            <p className="mt-2 max-w-xl text-text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
