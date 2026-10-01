# 피티홀릭짐

## doion 사이트 안내
- 사이트: 피티홀릭짐 (성균관대역 PT·헬스장, 수원 율전동)
- GitHub: dingdong0614/ptholic-1 (origin, 저장소 이름이 폴더 이름과 다름). 기본 브랜치: main
- 라이브: https://ptholic-1.vercel.app. 이 폴더에는 .vercel 연결 정보가 없어 Vercel 프로젝트명은 확인 필요
- 스택: Next 16.3.8 (App Router) + React 19 + TypeScript + Tailwind, lenis. 서체 Pretendard 사이트 글자 서브셋. 서버 라우트 app/api/admin/[key], app/api/congestion
- 빌드·로컬 확인: npm run dev (localhost:3000), npm run build, npm run lint. 테스트 스크립트 없음.
- 배포: 기본 브랜치(main)에 push하면 Vercel 자동 배포(수동 vercel deploy는 저장소와 어긋나므로 쓰지 않음). 미리보기 브랜치 배포는 Vercel 로그인 보호. push는 대표 요청·승인 후에만.
- 폰트·문구 변경 시: python scripts/font-subset.py <PretendardVariable.woff2 또는 .ttf> 후 빌드 (app, components, data, lib에 쓰인 글자를 서브셋에 담음). 사진 출처는 docs/image-credits.md
- 검사 스크립트: 없음
- 건드리면 안 되는 것: 관리자 키 URL 구조(app/api/admin/[key])는 대표 승인 전 변경 금지. 관리자·혼잡도 API의 rate limit(lib/ratelimit.ts) 유지. 홈 폴더의 ~/ptholic-1 은 낡은 복사본이라 쓰지 않음(실제 소스는 이 폴더)
- 공통 규칙: doion 공통 규칙은 doion 프로젝트 메모리(제작 방식·실무표준)를 따름.
