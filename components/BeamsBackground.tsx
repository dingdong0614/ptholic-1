"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/use-media";

/**
 * 서치라이트 빔 + 블루프린트 그리드 배경. 캔버스 없이 CSS만 사용해 가볍게 구현.
 * 데스크톱(fine pointer)에서는 커서를 따라가는 스포트라이트가 추가되고,
 * 모바일/reduced-motion에서는 회전 애니메이션 없이 정적으로 보인다.
 */
export default function BeamsBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!finePointer || reducedMotion) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = 50;
    let targetY = 40;
    let curX = 50;
    let curY = 40;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    }

    function loop() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      el!.style.setProperty("--spot-x", `${curX}%`);
      el!.style.setProperty("--spot-y", `${curY}%`);
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [finePointer, reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="beams-bg absolute inset-0 overflow-hidden"
      style={{ ["--spot-x" as string]: "50%", ["--spot-y" as string]: "35%" }}
    >
      <div className="blueprint-grid absolute inset-0 opacity-60" />
      <div className={`beam beam-a${reducedMotion ? "" : " beam-anim"}`} />
      <div className={`beam beam-b${reducedMotion ? "" : " beam-anim-rev"}`} />
      {finePointer && !reducedMotion && <div className="spotlight absolute inset-0" />}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
