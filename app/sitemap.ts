import type { MetadataRoute } from "next";

// TODO: 도메인 구매 후 NEXT_PUBLIC_SITE_URL 환경변수를 실제 도메인으로 설정하세요.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ptholicgym.com";
const PATHS = ["", "/pricing", "/facility", "/trainers", "/process", "/reviews", "/location", "/faq", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
  }));
}
