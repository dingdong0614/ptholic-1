import type { Metadata } from "next";
import Link from "next/link";
import { STOCK, unsplash } from "@/data/stock";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ } from "@/data/site";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "피티홀릭짐 자주 묻는 질문. 상담 예약 방법, 운영시간·휴무, 헬스복·수건 제공, 주차, 환불 규정. 성균관대역 수원 율전동 헬스장.",
  alternates: { canonical: "/faq" },
};

// 답이 확정된 문항만 구조화 데이터로 노출 ("확인 중" 문항 제외)
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.filter((f) => !f.a.includes("확인")).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero
        photo={{ src: unsplash(STOCK.dumbbellRow.id, 1600), stock: true }} crumb="FAQ" title="자주 묻는 질문" desc="여기 없는 질문은 문의 페이지로 편하게 남겨 주세요." />
      <section className="py-12 md:py-20">
        <div className="wrap">
          <FaqAccordion />
          <p className="mt-10 text-text-muted">
            다른 궁금한 점이 있나요?{" "}
            <Link href="/contact" className="font-semibold text-accent-strong underline underline-offset-4">
              문의 남기기
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
