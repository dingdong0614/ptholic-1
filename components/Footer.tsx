import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

const SITE_LINKS = [
  { href: "/pricing", label: "가격안내" },
  { href: "/facility", label: "시설소개" },
  { href: "/trainers", label: "트레이너" },
  { href: "/process", label: "진행방식·시간표" },
  { href: "/reviews", label: "회원후기" },
  { href: "/location", label: "오시는길" },
  { href: "/faq", label: "자주 묻는 질문" },
  { href: "/contact", label: "문의·무료체험" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { sns } = SITE_CONFIG;

  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-bold">피티홀릭짐</p>
          <p className="mt-2 text-[15px] text-text-muted">수원 율전동 1:1 PT 전문 · 성균관대역 도보 3분</p>
          <dl className="mt-6 space-y-2 text-[15px]">
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-text-faint">주소</dt>
              <dd className="text-text-muted">{SITE_CONFIG.addressFull}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-text-faint">운영</dt>
              <dd className="text-text-muted">
                {SITE_CONFIG.hours.weekday} · {SITE_CONFIG.hours.weekend} · 연중무휴
              </dd>
            </div>
            {SITE_CONFIG.phone && (
              <div className="flex gap-3">
                <dt className="w-12 shrink-0 text-text-faint">전화</dt>
                <dd>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`} className="text-text-muted hover:text-text">
                    {SITE_CONFIG.phone}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <nav aria-label="사이트 메뉴">
          <p className="text-[14px] font-semibold text-text-faint">메뉴</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-[40px] items-center text-[15px] text-text-muted hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[14px] font-semibold text-text-faint">채널</p>
          <ul className="mt-4">
            <li>
              <a href={sns.reservationUrl} target="_blank" rel="noopener" className="flex min-h-[40px] items-center text-[15px] text-text-muted hover:text-text">
                네이버 예약
              </a>
            </li>
            <li>
              <a href={sns.instagramUrl} target="_blank" rel="noopener" className="flex min-h-[40px] items-center text-[15px] text-text-muted hover:text-text">
                인스타그램 {sns.instagramHandle}
              </a>
            </li>
            <li>
              <a href={sns.blogUrl} target="_blank" rel="noopener" className="flex min-h-[40px] items-center text-[15px] text-text-muted hover:text-text">
                네이버 블로그
              </a>
            </li>
            {sns.kakaoUrl && (
              <li>
                <a href={sns.kakaoUrl} target="_blank" rel="noopener" className="flex min-h-[40px] items-center text-[15px] text-text-muted hover:text-text">
                  카카오톡 오픈채팅
                </a>
              </li>
            )}
            <li>
              <Link href="/privacy" className="flex min-h-[40px] items-center text-[15px] font-semibold text-text-muted hover:text-text">
                개인정보처리방침
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap border-t border-line py-6 text-[13px] text-text-faint">
        &copy; {year} 피티홀릭짐 · 매장·트레이너 사진은 피티홀릭짐 실사진, 참고 이미지 사진: Unsplash
      </div>
    </footer>
  );
}
