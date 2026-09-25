"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 스크롤 진입 시 16px 상승 + 페이드 (240ms, transform/opacity만).
 * JS가 없거나 reduced-motion이면 처음부터 보인다 (globals.css의 .js .reveal 규칙).
 */
export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 구형 브라우저 폴백
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error -- 다형 태그 ref
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** 제목은 LCP·레이아웃 시프트를 막기 위해 움직이지 않고 그대로 렌더한다. */
export function RevealHeading({
  text,
  as: Tag = "h1",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  return <Tag className={className}>{text}</Tag>;
}
