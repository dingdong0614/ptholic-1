"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media";

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: isMobile ? 0.7 : 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion, isMobile]);

  return <>{children}</>;
}
