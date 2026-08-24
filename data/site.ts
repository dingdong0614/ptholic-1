/**
 * 피티홀릭짐 사이트 전역 설정.
 * 이 파일의 값만 바꾸면 화면에 그대로 반영됩니다. (컴포넌트 코드 수정 불필요)
 */

export const SITE_CONFIG = {
  name: "피티홀릭짐",
  addressFull: "경기도 수원시 장안구 서부로2135번길 30 (율전동)",
  addressShort: "수원 율전동 · 성균관대역 도보 3분",
  station: "성균관대역에서 도보 3분",
  hours: {
    weekday: "평일 06:00 – 24:00",
    weekend: "주말 09:00 – 17:00",
    notice: "공휴일 운영시간은 매장 공지사항을 통해 별도 안내됩니다.",
  },
  sns: {
    instagramHandle: "@ptholicgym_office",
    instagramUrl: "https://www.instagram.com/ptholicgym_office/",
    blogUrl: "https://blog.naver.com/ptholicgym",
    mapUrl: "https://naver.me/FoX7XYLB",
    reservationUrl: "https://map.naver.com/p/entry/place/1820680499?placePath=%2Fticket",
  },
  mapQuery: "경기도 수원시 장안구 서부로2135번길 30 피티홀릭짐",
  heroImage: "/assets/img/facility/facility-3.jpg",
  contact: {
    web3formsAccessKey: "25f74fdb-ce22-49d1-9cd7-576a68637237",
  },
} as const;

export const PROMOTIONS = [
  {
    badge: "이달의 헬스 특가",
    title: "헬스 5개월",
    price: 185000,
    desc: "장기 등록 시 가장 합리적인 구성",
  },
  {
    badge: "PT 보너스 세션",
    title: "PT 20+2회",
    price: 990000,
    desc: "20회 등록 시 2회 무료 추가 증정",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "무릎 통증으로 찾아왔는데 체형과 자세를 꼼꼼히 봐주시고, 개인 일정에 맞춰 스케줄을 짜주셔서 3개월 만에 다시 운동을 시작할 수 있었어요. 흐트러진 자세도 잘 맞춰주시고 꼼꼼하게 알려주셔서 좋았습니다.",
    meta: "회원 후기",
  },
  {
    quote:
      "대학생이라 시간 내기 어려웠는데 이른 아침 시간에도 배울 수 있어서 좋았습니다. 운동이 처음이라 배워야 할 게 많았는데 초보자도 이해하기 쉽게 잘 알려주셨어요. 체계적이고 책임감 있고 자세하게 알려주십니다.",
    meta: "회원 후기",
  },
];

export const FAQ = [
  {
    q: "주차 가능한가요?",
    a: "주차 관련 안내는 현재 확인 중입니다. 정확한 내용으로 곧 업데이트됩니다.",
  },
  {
    q: "헬스복 · 수건은 제공되나요?",
    a: "네, 헬스복과 수건은 무료로 제공됩니다.",
  },
  {
    q: "PT 상담은 어떻게 예약하나요?",
    a: "하단 문의 폼을 작성하시거나, 네이버 예약 · 인스타그램 DM을 통해 상담 예약이 가능합니다.",
  },
  {
    q: "환불 · 일정 변경 규정은 어떻게 되나요?",
    a: "환불 및 일정 변경 규정은 확인 후 정확한 내용으로 안내드릴 예정입니다.",
  },
];
