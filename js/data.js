/**
 * 피티홀릭짐 콘텐츠 데이터
 * 이 파일의 값만 바꾸면 화면에 그대로 반영됩니다. (HTML/CSS 수정 불필요)
 * 가격은 숫자(원 단위)로, 나머지는 텍스트로 입력하세요.
 */

const SITE_CONFIG = {
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
    // 네이버 지도 플레이스 페이지 (길찾기 · 위치 확인용)
    mapUrl: "https://naver.me/FoX7XYLB",
    // 네이버 지도 내 예약(티켓) 탭으로 연결됩니다.
    reservationUrl: "https://map.naver.com/p/entry/place/1820680499?placePath=%2Fticket",
  },
  mapQuery: "경기도 수원시 장안구 서부로2135번길 30 피티홀릭짐",
  // 실제 매장 사진(네이버 블로그 게시물)에서 가져온 히어로 배경입니다.
  heroImage: "assets/img/facility/facility-3.jpg",
  contact: {
    // web3forms.com에서 발급받은 Access Key입니다.
    // 문의를 받을 이메일을 바꾸고 싶으면 web3forms.com에서 새 이메일로 키를 재발급받아 이 값을 교체하세요.
    web3formsAccessKey: "25f74fdb-ce22-49d1-9cd7-576a68637237",
  },
};

// 관리자가 매달 교체하는 프로모션 영역 — 아래 배열의 항목만 수정/추가/삭제하면 됩니다.
const PROMOTIONS = [
  {
    badge: "이달의 헬스 특가",
    title: "헬스 5개월",
    price: 185000,
    unit: "",
    desc: "장기 등록 시 가장 합리적인 구성",
  },
  {
    badge: "PT 보너스 세션",
    title: "PT 20+2회",
    price: 990000,
    unit: "",
    desc: "20회 등록 시 2회 무료 추가 증정",
  },
];

const PRICING = {
  vatNote: "* 안내된 모든 금액은 부가세(VAT) 별도입니다.",
  tables: [
    {
      id: "personal",
      label: "개인 PT",
      desc: "1:1 맞춤 코칭",
      plans: [
        { sessions: 10, price: 550000 },
        { sessions: 20, price: 1050000 },
        { sessions: 30, price: 1500000 },
        { sessions: 40, price: 1900000 },
      ],
    },
    {
      id: "duo",
      label: "2:1 PT",
      desc: "친구 · 동료와 함께",
      plans: [
        { sessions: 10, price: 825000 },
        { sessions: 20, price: 1575000 },
        { sessions: 30, price: 2250000 },
        { sessions: 40, price: 2850000 },
      ],
    },
    {
      id: "membership",
      label: "헬스장 이용권",
      desc: "자유 이용",
      plans: [
        { sessions: 1, unitLabel: "개월", price: 55000 },
        { sessions: 3, unitLabel: "개월", price: 135000 },
        { sessions: 6, unitLabel: "개월", price: 240000 },
        { sessions: 12, unitLabel: "개월", price: 420000 },
      ],
    },
  ],
  extras: [
    { label: "헬스복 · 수건", value: "무료 제공" },
    { label: "개인 락커", value: "월 7,000원" },
  ],
};

// 경력·자격사항은 네이버 블로그 트레이너 소개 게시물 원문을 그대로 옮긴 것입니다.
// 원문 표기(영문 브랜드명 등)에 오탈자가 있을 수 있어, 최종 확인 후 텍스트만 교체하세요.
const TRAINERS = [
  {
    name: "권영민",
    tagline: "서두르지 말되 멈추지 말라",
    teachingStyle:
      "첫 세션에서 체형과 움직임 패턴을 꼼꼼히 평가한 뒤, 통증이나 불균형이 있는 부위는 저강도 교정 운동으로 먼저 풀어냅니다. 이후 필라테스 기반 코어 컨트롤 훈련과 케틀벨을 활용한 기능성 동작을 단계적으로 늘려가며, 무리한 중량보다는 정확한 자세와 호흡에 집중합니다.",
    specialty: "교정운동 · 재활 필라테스 전문",
    photo: "assets/img/trainers/kwon-youngmin.jpg",
    // 요일별 가능 시간을 텍스트로 입력하세요. 빈 값은 "협의 후 안내"로 표시됩니다.
    schedule: { 월: "", 화: "", 수: "", 목: "", 금: "", 토: "" },
    career: [
      "수원공업고등학교 보디빌딩 선수부",
      "K7 휘트니스 트레이너",
      "BODY ONE 휘트니스 트레이너",
      "잠오브캐슬 휘트니스 트레이너",
      "휘트니스 클럽 S 트레이너",
      "호텔신라 삼성전자 16라인 휘트니스 트레이너",
      "앙그리바디짐 트레이너",
      "어반 휘트니스 트레이너",
      "피티홀릭짐 트레이너 (현)",
      "MR. 수원 보디빌딩 대회 입상",
      "MR. 고양 보디빌딩 대회 입상",
      "MR. 경기 보디빌딩 대회 입상",
      "수원시생활체육대축전 보디빌딩 대회 입상",
      "대학 보디빌딩 대회 입상 외 다수",
    ],
    certs: [
      "HLP-health lifestyle Professional",
      "NASM CES specialty workshop",
      "NASM OPTIMA international",
      "KKF대한케틀벨연맹 케틀벨 지도자",
      "생활스포츠지도자 2급 보디빌딩",
      "FISAF 국제트레이너",
      "리더십 지도자",
      "운동처방사",
    ],
  },
  {
    name: "안정호",
    tagline: "인내는 쓰나 그 열매는 달다",
    teachingStyle:
      "복싱으로 다져진 스피드와 순발력 훈련을 바탕으로, 관절 가동성 체크부터 시작해 실생활 동작에 가까운 복합 운동으로 프로그램을 구성합니다. 세트마다 자세를 직접 촬영해 보여주며 피드백하고, 체력 수준에 맞춰 강도를 세밀하게 조절합니다.",
    specialty: "기능성 트레이닝 전문",
    photo: "assets/img/trainers/an-jeongho.jpg",
    schedule: { 월: "", 화: "", 수: "", 목: "", 금: "", 토: "" },
    career: [
      "수원시장배 아마추어 복싱대회 1위",
      "코리안비트 전국복싱대회 1위",
      "동대문구협회장배 아마추어 복싱대회 2위",
      "K7 휘트니스 트레이너",
      "A 휘트니스 트레이너",
      "신라호텔 삼성전자 임직원 전담 트레이너",
      "어반 휘트니스 트레이너",
      "피티홀릭짐 트레이너 (현)",
    ],
    certs: [
      "생활스포츠지도자 2급 보디빌딩",
      "HLP-health lifestyle professional",
      "NASM OPTIMA international",
      "FISAF 국제 퍼스널 트레이너",
      "FISAF 근막통증 IT증후근 재활/교정",
      "FISAF 메디컬 트레이닝",
      "NACA CPT",
      "퍼스널 트레이닝의 정수",
      "NASM PES",
      "기능성운동 평가와 실전",
      "움직임 · 관절운동학",
      "자세평가 이론과 실전",
      "근골격계 기능해부학",
      "근골격계 신경해부학",
    ],
  },
  {
    name: "홍승범",
    tagline: "최선이 반복되면 최고가 된다",
    teachingStyle:
      "대회 준비 경험을 바탕으로 부위별 자극에 집중하는 분할 루틴을 주로 사용합니다. 세트마다 목표 근육의 수축 · 이완을 직접 확인시켜주고, 점진적 과부하 원칙에 따라 중량과 횟수를 체계적으로 늘려가며 근비대를 목표로 코칭합니다.",
    specialty: "보디빌딩 · 근비대 전문",
    photo: "assets/img/trainers/hong-seungbeom.jpg",
    schedule: { 월: "", 화: "", 수: "", 목: "", 금: "", 토: "" },
    career: [
      "헬스타임 휘트니스 트레이너",
      "K7 휘트니스 트레이너",
      "휘트니스 클럽 S 트레이너",
      "PT7 휘트니스 트레이너",
      "피트니스디 트레이너",
      "피티홀릭짐 트레이너 (현)",
      "MR. 고양 보디빌딩 대회 입상",
      "PCA 보디빌딩 대회 입상",
      "NPC 리저널 클래식피지크 대회 입상",
      "MUSA 서울 클래식피지크 대회 통합그랑프리",
      "MUSA 일산 클래식피지크 대회 입상",
    ],
    certs: [
      "생활스포츠지도자 2급 보디빌딩",
      "미국 NASM Certification",
      "NASM OPTIMA international",
      "KKF대한케틀벨연맹 케틀벨 지도자",
      "운동처방사",
    ],
  },
];

// 기구 브랜드 · 모델명 · 사용법은 추후 확정 데이터로 교체 예정 (지금은 카테고리 구조만)
const EQUIPMENT_ZONES = [
  { name: "웨이트존", desc: "머신 기반 부위별 근력 운동 구역입니다. 세부 기구 정보는 준비 중입니다." },
  { name: "프리웨이트존", desc: "바벨 · 덤벨 기반 자유 중량 운동 구역입니다. 세부 기구 정보는 준비 중입니다." },
  {
    name: "기능성 운동존",
    desc: "케틀벨 · 슬라이딩보드 · 밴드 등 소도구로 진행하는 기능성 트레이닝 구역입니다. 케틀벨 스윙 · 클린 · 스내치 같은 전신 동작은 코어 안정성과 폭발적인 근력을 동시에 길러주고, 한 부위만 고립시키는 머신 운동과 달리 여러 관절 · 근육을 함께 사용해 실생활 움직임 패턴과 균형 감각까지 끌어올립니다. KKF(대한케틀벨연맹) 케틀벨 지도자 자격을 보유한 트레이너에게 기초 자세부터 배울 수 있습니다.",
  },
  { name: "유산소존", desc: "트레드밀 · 사이클 등 유산소 운동 구역입니다. 세부 기구 정보는 준비 중입니다." },
];

// 최근 리뉴얼 현장을 담은 실제 매장 사진입니다. (네이버 블로그 게시물 원본)
const GALLERY_PHOTOS = [
  { src: "assets/img/facility/facility-1.jpg", alt: "케틀벨 · 스텝박스가 놓인 웨이트존 입구" },
  { src: "assets/img/facility/facility-3.jpg", alt: "새로 교체한 바닥재와 랙이 늘어선 프리웨이트존" },
  { src: "assets/img/facility/facility-4.jpg", alt: "덤벨 랙과 머신이 배치된 웨이트존" },
  { src: "assets/img/facility/facility-6.jpg", alt: "케이블 머신과 힙 어브덕션 존" },
  { src: "assets/img/facility/facility-5.jpg", alt: "유산소 존으로 이어지는 트레이닝 공간" },
  { src: "assets/img/facility/facility-2.jpg", alt: "리뉴얼된 논슬립 바닥재 클로즈업" },
];

const PROCESS_STEPS = [
  { step: "01", title: "체력 테스트", desc: "현재 체력 수준과 신체 밸런스를 정밀하게 측정해 개인 맞춤 프로그램을 설계합니다." },
  { step: "02", title: "생활 패턴 분석 · 식사 관리", desc: "일상 패턴을 파악해 실천 가능한 식사 관리 방향을 함께 잡아드립니다." },
  { step: "03", title: "해부학 기반 자세 코칭", desc: "해부학적 근거를 바탕으로 부상 위험을 낮추고 정확한 자세를 교정합니다." },
];

const SCHEDULE_DAYS = ["월", "화", "수", "목", "금", "토"];

const TESTIMONIALS = [
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

// 실제 문의 사항 확인 후 보강 예정인 초기 FAQ 항목입니다.
const FAQ = [
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
