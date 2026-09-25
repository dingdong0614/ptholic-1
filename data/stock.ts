/**
 * 보조용 스톡 사진 (Unsplash, 무료 라이선스). 인물 없는 기구 클로즈업만 사용하고
 * 화면에는 "참고 이미지"로 표시합니다. 매장·트레이너 사진은 항상 실사진을 씁니다.
 * 출처 기록: docs/image-credits.md
 */
export const STOCK = {
  kettlebells: {
    id: "photo-1632077804406-188472f1a810",
    author: "Heidi Erickson",
    alt: "줄지어 놓인 케틀벨 (참고 이미지)",
  },
  dumbbellRack: {
    id: "photo-1576678927484-cc907957088c",
    author: "Samuel Girven",
    alt: "랙에 놓인 덤벨 (참고 이미지)",
  },
  dumbbellRow: {
    id: "photo-1734630341082-0fec0e10126c",
    author: "Jason Grant",
    alt: "덤벨 열 (참고 이미지)",
  },
} as const;

export function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}
