"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CongestionWidget from "@/components/CongestionWidget";
import { SITE_CONFIG } from "@/data/site";

const NAV_LINKS = [
  { href: "/pricing", label: "가격" },
  { href: "/facility", label: "시설" },
  { href: "/trainers", label: "트레이너" },
  { href: "/process", label: "진행방식" },
  { href: "/reviews", label: "후기" },
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
      className={`sticky top-0 z-[100] border-b transition-colors duration-200 ${
        scrolled || open ? "border-line bg-bg lg:bg-bg/85 lg:backdrop-blur-md" : "border-transparent bg-bg lg:bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="피티홀릭짐 홈">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-[12px] font-bold tracking-tight text-accent-ink">
            PH
          </span>
          <span className="text-[19px] font-bold tracking-tight">피티홀릭짐</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-[15px] font-medium transition-colors ${
                  isActive ? "bg-surface-raised text-text" : "text-text-muted hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CongestionWidget compact />
          <a href={SITE_CONFIG.sns.reservationUrl} target="_blank" rel="noopener" className="btn btn-primary !min-h-[42px] !px-5 !text-[15px]">
            상담 예약
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobileNav"
          onClick={() => setOpen((v) => !v)}
          className="relative -mr-2 h-11 w-11 shrink-0 lg:hidden"
        >
          <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded bg-text transition-transform duration-200 ${
              open ? "translate-y-0 rotate-45" : "-translate-y-[7px]"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded bg-text transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded bg-text transition-transform duration-200 ${
              open ? "translate-y-0 -rotate-45" : "translate-y-[7px]"
            }`}
          />
        </button>
      </div>

      <nav
        id="mobileNav"
        aria-label="모바일 메뉴"
        hidden={!open}
        className="border-t border-line bg-bg lg:hidden"
      >
        <div className="wrap grid grid-cols-2 gap-x-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`flex min-h-[48px] items-center border-b border-line text-[17px] font-semibold ${
                pathname === link.href ? "text-accent-strong" : "text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="wrap pb-5">
          <CongestionWidget compact />
        </div>
      </nav>
    </header>
  );
}
