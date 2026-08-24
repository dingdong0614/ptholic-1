export type PricingPlan = { sessions: number; unitLabel?: string; price: number };
export type PricingTable = { id: string; label: string; desc: string; plans: PricingPlan[] };

export const PRICING: { vatNote: string; tables: PricingTable[]; extras: { label: string; value: string }[] } = {
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
