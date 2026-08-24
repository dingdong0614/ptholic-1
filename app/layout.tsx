import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ptholicgym.com"),
  title: {
    default: "피티홀릭짐 | 성균관대역 PT · 수원 율전동 헬스장",
    template: "%s | 피티홀릭짐",
  },
  description:
    "성균관대역 도보 3분, 수원 율전동 피티홀릭짐. 체력테스트 기반 개인 맞춤 PT, 식사 관리, 해부학적 근거 기반 자세 코칭을 제공합니다.",
  keywords: ["성균관대역 PT", "수원 율전동 헬스장", "율전동 PT", "피티홀릭짐", "수원 개인PT"],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "피티홀릭짐",
    images: ["/assets/img/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          본문 바로가기
        </a>
        <ScrollProvider>
          <CustomCursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
