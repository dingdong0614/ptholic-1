import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// 자체 도메인 연결 후에는 NEXT_PUBLIC_SITE_URL 환경변수를 실제 도메인으로 설정하세요 (lib/site-url.ts).
const PATHS = ["", "/pricing", "/facility", "/trainers", "/process", "/reviews", "/location", "/faq", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
  }));
}
