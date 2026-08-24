import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "피티홀릭짐 자주 묻는 질문. 주차, 헬스복·수건 제공, PT 상담 예약, 환불·일정 변경 규정 안내.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero crumb="FAQ" title="자주 묻는 질문" desc="궁금한 점이 더 있다면 문의 페이지를 통해 편하게 물어보세요." />
      <section className="py-16 md:py-24">
        <div className="wrap">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
