import Icon from "@/components/Icon";
import { SITE_CONFIG } from "@/data/site";

/**
 * 모바일 하단 고정 상담바. 데스크톱(lg 이상)에서는 헤더 CTA가 대신한다.
 * 전화번호·카카오톡 URL이 data/site.ts에 채워지면 자동으로 우선 노출된다.
 */
export default function MobileActionBar() {
  const { sns, phone } = SITE_CONFIG;
  const secondary = phone
    ? { href: `tel:${phone.replace(/[^0-9+]/g, "")}`, label: "전화", icon: "phone", external: false }
    : sns.kakaoUrl
      ? { href: sns.kakaoUrl, label: "카톡 문의", icon: "message", external: true }
      : { href: sns.instagramUrl, label: "DM 문의", icon: "instagram", external: true };

  return (
    <nav
      aria-label="빠른 상담"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-line-strong bg-bg px-3 pt-2.5 lg:hidden"
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2">
        <a
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noopener" } : {})}
          className="flex min-h-[52px] w-[26%] flex-col items-center justify-center gap-0.5 rounded-xl border border-line-strong bg-surface text-[12px] font-semibold text-text"
        >
          <Icon name={secondary.icon} size={18} />
          {secondary.label}
        </a>
        <a
          href={sns.mapUrl}
          target="_blank"
          rel="noopener"
          className="flex min-h-[52px] w-[26%] flex-col items-center justify-center gap-0.5 rounded-xl border border-line-strong bg-surface text-[12px] font-semibold text-text"
        >
          <Icon name="pin" size={18} />
          길찾기
        </a>
        <a
          href={sns.reservationUrl}
          target="_blank"
          rel="noopener"
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent px-3 text-[16px] font-bold text-accent-ink"
        >
          <Icon name="calendar" size={18} />
          상담 예약하기
        </a>
      </div>
    </nav>
  );
}
