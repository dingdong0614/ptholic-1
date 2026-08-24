"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/use-media";

/**
 * 타겟팅(crosshair) 커스텀 커서. "정밀함" 컨셉에 맞춘 인터랙션.
 * 데스크톱(fine pointer)에서만 동작 — 터치 기기에서는 렌더링하지 않음.
 */
export default function CustomCursor() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const active = finePointer && !reducedMotion;

  useEffect(() => {
    if (!active) return;

    document.body.classList.add("cursor-none-fine");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let rafId: number;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    }

    function onDown() {
      ringRef.current?.classList.add("is-active");
    }
    function onUp() {
      ringRef.current?.classList.remove("is-active");
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="crosshair-ring pointer-events-none fixed left-0 top-0 z-[300] h-9 w-9"
      >
        <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-accent-strong/80" />
        <span className="absolute left-1/2 bottom-0 h-2 w-px -translate-x-1/2 bg-accent-strong/80" />
        <span className="absolute top-1/2 left-0 w-2 h-px -translate-y-1/2 bg-accent-strong/80" />
        <span className="absolute top-1/2 right-0 w-2 h-px -translate-y-1/2 bg-accent-strong/80" />
        <span className="absolute inset-0 rounded-full border border-accent/40 transition-all duration-150" />
      </div>
    </>
  );
}
