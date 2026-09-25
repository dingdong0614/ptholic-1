import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import MobileActionBar from "@/components/MobileActionBar";
import { SITE_CONFIG } from "@/data/site";
import { PRICING } from "@/data/pricing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ptholicgym.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "피티홀릭짐 | 성균관대역 PT · 수원 율전동 헬스장",
    template: "%s | 피티홀릭짐",
  },
  description:
    "성균관대역(성대역) 도보 3분, 수원 율전동 1:1 PT 전문 헬스장 피티홀릭짐. 체력테스트 기반 맞춤 PT, 생활패턴 맞춤 식사 관리, 해부학 근거 자세 코칭. 평일 06~24시, 연중무휴.",
  keywords: [
    "성균관대역 PT",
    "성대역 헬스장",
    "수원 율전동 헬스장",
    "율전동 PT",
    "천천동 헬스장",
    "성균관대 헬스장",
    "수원 개인PT",
    "피티홀릭짐",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "피티홀릭짐",
    title: "피티홀릭짐 | 성균관대역 PT · 수원 율전동 헬스장",
    description: "성균관대역 도보 3분, 수원 율전동 1:1 PT 전문 헬스장. 체력테스트로 시작하는 맞춤 PT.",
    images: ["/assets/img/og-image.jpg"],
  },
  // 네이버 서치어드바이저·구글 인증값은 환경변수로 넣습니다(값이 없으면 태그를 만들지 않음).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? { "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0f",
  colorScheme: "dark",
};

const minPrice = Math.min(...PRICING.tables.flatMap((t) => t.plans.map((p) => p.price)));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": `${SITE_URL}/#gym`,
  name: SITE_CONFIG.name,
  url: SITE_URL,
  image: `${SITE_URL}/assets/img/og-image.jpg`,
  description:
    "성균관대역 도보 3분, 수원 율전동 1:1 PT 전문 헬스장. 체력테스트 기반 맞춤 PT, 식사 관리, 해부학 근거 자세 코칭.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "서부로2135번길 30, 2층",
    addressLocality: "수원시 장안구",
    addressRegion: "경기도",
    addressCountry: "KR",
  },
  areaServed: ["수원시 장안구 율전동", "수원시 장안구 천천동", "성균관대역"],
  hasMap: SITE_CONFIG.sns.mapUrl,
  ...(SITE_CONFIG.phone ? { telephone: SITE_CONFIG.phone } : {}),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "23:59",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: `₩${minPrice.toLocaleString("ko-KR")}~`,
  currenciesAccepted: "KRW",
  sameAs: [SITE_CONFIG.sns.instagramUrl, SITE_CONFIG.sns.blogUrl, SITE_CONFIG.sns.mapUrl],
  potentialAction: {
    "@type": "ReserveAction",
    target: SITE_CONFIG.sns.reservationUrl,
    name: "네이버 예약으로 PT 상담 예약",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* JS 가능 환경에서만 스크롤 리빌을 숨김 처리 (JS 없으면 전부 보임) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
                        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="has-actionbar">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          본문 바로가기
        </a>
        <ScrollProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </ScrollProvider>
      </body>
    </html>
  );
}
