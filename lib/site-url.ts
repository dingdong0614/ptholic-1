/**
 * 사이트 기준 주소 (canonical, og:image, sitemap, robots, 구조화 데이터에 공통 사용).
 * 1순위: NEXT_PUBLIC_SITE_URL (자체 도메인 연결 후 설정)
 * 2순위: Vercel이 빌드 때 자동으로 넣는 프로덕션 도메인(VERCEL_PROJECT_PRODUCTION_URL)
 * 3순위: 현재 운영 주소
 * 예전 기본값(ptholicgym.com)은 아직 연결되지 않은 도메인이라 canonical·공유 미리보기 이미지가 깨졌다.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (fromEnv || fromVercel || "https://ptholic-1.vercel.app").replace(/\/+$/, "");
