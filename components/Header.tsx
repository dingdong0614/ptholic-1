"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CongestionWidget from "@/components/CongestionWidget";

const NAV_LINKS = [
  { href: "/pricing", label: "가격안내" },
  { href: "/facility", label: "시설소개" },
  { href: "/trainers", label: "트레이너" },
  { href: "/process", label: "진행방식" },
  { href: "/reviews", label: "회원후기" },
  { href: "/location", label: "오시는길" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] border-b transition-colors ${
        scrolled ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg/60 backdrop-blur-sm"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-8 w-8 place-items-center border border-line-strong font-mono text-xs text-accent-strong">
            PH
          </span>
          <span className="font-display text-lg tracking-wide">피티홀릭짐</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden lg:flex items-center gap-6 font-mono text-[13px] tracking-wide">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors ${
                  isActive ? "text-accent-strong" : "text-text-muted hover:text-text"
                }`}
              >
                {link.label}
                {isActive && <span className="absolute -bottom-px left-0 right-0 h-px bg-accent-strong" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <CongestionWidget compact />
          <Link
            href="/contact"
            className="border border-line-strong px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent hover:text-text"
          >
            문의하기
          </Link>
          <Link
            href="/contact#trial"
            className="bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            무료 체험 신청
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobileNav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative h-9 w-9 shrink-0"
        >
          <span className="sr-only">메뉴 열기</span>
          <span
            className={`absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-text transition-transform ${
              open ? "translate-y-0 rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-text transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-text transition-transform ${
              open ? "translate-y-0 -rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      <nav
        id="mobileNav"
        aria-label="모바일 메뉴"
        className={`lg:hidden overflow-hidden border-t border-line bg-bg transition-[max-height] duration-300 ${
          open ? "max-h-[520px]" : "max-h-0 border-t-0"
        }`}
      >
        <div className="wrap flex flex-col gap-1 py-4 font-mono text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2.5 ${pathname === link.href ? "text-accent-strong" : "text-text-muted"}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-3">
            <Link href="/contact" className="flex-1 border border-line-strong py-2.5 text-center text-sm">
              문의하기
            </Link>
            <Link href="/contact#trial" className="flex-1 bg-accent py-2.5 text-center text-sm font-semibold text-white">
              무료 체험
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
