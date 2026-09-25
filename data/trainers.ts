export type Trainer = {
  slug: string;
  name: string;
  tagline: string;
  teachingStyle: string;
  specialty: string;
  photo: string;
  videoUrl: string | null;
  reviews: string[];
  schedule: Record<(typeof SCHEDULE_DAYS)[number], string>;
  career: string[];
  certs: string[];
};

export const SCHEDULE_DAYS = ["월", "화", "수", "목", "금", "토"] as const;

// reviews: 네이버 블로그 후기 게시물 원문에서 해당 트레이너 이름이 언급된 후기만 그대로 옮김.
// 경력·자격사항은 네이버 블로그 트레이너 소개 게시물 원문을 그대로 옮긴 것입니다.
export const TRAINERS: Trainer[] = [
  {
    slug: "kwon-youngmin",
    name: "권영민",
    tagline: "서두르지 말되 멈추지 말라",
    teachingStyle:
      "첫 세션에서 체형과 움직임 패턴을 꼼꼼히 평가한 뒤, 통증이나 불균형이 있는 부위는 저강도 교정 운동으로 먼저 풀어냅니다. 이후 필라테스 기반 코어 컨트롤 훈련과 케틀벨을 활용한 기능성 동작을 단계적으로 늘려가며, 무리한 중량보다는 정확한 자세와 호흡에 집중합니다.",
    specialty: "교정운동 · 재활 필라테스 전문",
    photo: "/assets/img/trainers/kwon-youngmin.jpg",
    videoUrl: null,
    reviews: [
      "권영민 선생님께 3개월 배우면서 다시 운동 시작할 수 있어 매우 좋았습니다! 시작 전에 전반적인 상담도 잘해주셔서 목표 설정하기 좋고 자세 및 개인 운동 스케줄까지 하나하나 세심하게 챙겨주셔서 꼼꼼하게 운동할 수 있었습니다!",
    ],
    schedule: { 월: "", 화: "", 수: "", 목: "", 금: "", 토: "" },
    career: [
      "수원공업고등학교 보디빌딩 선수부",
      "K7 휘트니스 트레이너",
      "BODY ONE 휘트니스 트레이너",
      "짐오브캐슬 휘트니스 트레이너",
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
    slug: "an-jeongho",
    name: "안정호",
    tagline: "인내는 쓰나 그 열매는 달다",
    teachingStyle:
      "복싱으로 다져진 스피드와 순발력 훈련을 바탕으로, 관절 가동성 체크부터 시작해 실생활 동작에 가까운 복합 운동으로 프로그램을 구성합니다. 세트마다 자세를 직접 촬영해 보여주며 피드백하고, 체력 수준에 맞춰 강도를 세밀하게 조절합니다.",
    specialty: "기능성 트레이닝 전문",
    photo: "/assets/img/trainers/an-jeongho.jpg",
    videoUrl: null,
    reviews: [],
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
    slug: "hong-seungbeom",
    name: "홍승범",
    tagline: "최선이 반복되면 최고가 된다",
    teachingStyle:
      "대회 준비 경험을 바탕으로 부위별 자극에 집중하는 분할 루틴을 주로 사용합니다. 세트마다 목표 근육의 수축 · 이완을 직접 확인시켜주고, 점진적 과부하 원칙에 따라 중량과 횟수를 체계적으로 늘려가며 근비대를 목표로 코칭합니다.",
    specialty: "보디빌딩 · 근비대 전문",
    photo: "/assets/img/trainers/hong-seungbeom.jpg",
    videoUrl: null,
    reviews: [],
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
