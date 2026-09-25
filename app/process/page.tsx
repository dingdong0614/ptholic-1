import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/ProcessSteps";
import ScheduleTabs from "@/components/ScheduleTabs";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "진행방식 · 시간표",
  description:
    "피티홀릭짐 PT 진행방식과 트레이너별 시간표. 체력테스트, 생활 패턴 맞춤 식사 관리, 해부학 기반 자세 코칭. 성균관대역 도보 3분 수원 율전동 PT.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        photo={{ src: "/assets/img/facility/facility-5.jpg" }}
        crumb="진행방식"
        title="첫 수업은 체력테스트부터"
        desc="지금 몸 상태를 먼저 재고, 그 결과로 식사 방향과 자세 교정 순서를 정해요."
      />

      <section className="py-12 md:py-20">
        <div className="wrap">
          <ProcessSteps />
        </div>
      </section>

      <section className="section border-t border-line bg-bg-alt">
        <div className="wrap">
          <SectionHeading
            title="트레이너별 시간표"
            desc="트레이너를 고르면 수업 스타일과 요일별 가능 시간을 볼 수 있어요."
          />
          <div className="mt-10">
            <ScheduleTabs />
          </div>
        </div>
      </section>
    </>
  );
}
