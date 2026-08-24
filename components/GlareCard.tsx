"use client";

import { useRef } from "react";
import { useFinePointer } from "@/lib/use-media";

/**
 * 커서를 따라 살짝 틸트되고 하이라이트(글레어)가 스치는 카드 래퍼.
 * 터치 기기에서는 틸트 없이 일반 카드로 동작.
 */
export default function GlareCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!finePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    ref.current.style.setProperty("--rx", `${rotateX}deg`);
    ref.current.style.setProperty("--ry", `${rotateY}deg`);
    ref.current.style.setProperty("--gx", `${px * 100}%`);
    ref.current.style.setProperty("--gy", `${py * 100}%`);
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glare-card ${className}`}
    >
      <div className="glare-card-glow" aria-hidden="true" />
      {children}
    </div>
  );
}
