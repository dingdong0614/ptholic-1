import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg">피티홀릭짐</p>
          <p className="mt-3 text-sm text-text-muted">{SITE_CONFIG.addressFull}</p>
          <p className="mt-1 text-sm text-text-muted">
            {SITE_CONFIG.hours.weekday} / {SITE_CONFIG.hours.weekend}
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm">
          <p className="mb-1 text-xs tracking-[0.14em] text-text-faint">SITE</p>
          <Link href="/pricing" className="text-text-muted hover:text-text">
            가격안내
          </Link>
          <Link href="/trainers" className="text-text-muted hover:text-text">
            트레이너
          </Link>
          <Link href="/location" className="text-text-muted hover:text-text">
            오시는길
          </Link>
          <Link href="/privacy" className="text-text-muted hover:text-text">
            개인정보처리방침
          </Link>
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm">
          <p className="mb-1 text-xs tracking-[0.14em] text-text-faint">CHANNEL</p>
          <a href={SITE_CONFIG.sns.instagramUrl} target="_blank" rel="noopener" className="text-text-muted hover:text-text">
            Instagram
          </a>
          <a href={SITE_CONFIG.sns.blogUrl} target="_blank" rel="noopener" className="text-text-muted hover:text-text">
            Naver Blog
          </a>
          <a href={SITE_CONFIG.sns.reservationUrl} target="_blank" rel="noopener" className="text-text-muted hover:text-text">
            Naver Booking
          </a>
        </div>
      </div>
      <div className="wrap border-t border-line py-5 text-xs text-text-faint">
        &copy; {year} 피티홀릭짐. All rights reserved.
      </div>
    </footer>
  );
}
