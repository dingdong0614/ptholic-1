import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProcessSteps from "@/components/ProcessSteps";
import ScheduleTabs from "@/components/ScheduleTabs";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "진행방식 · 시간표",
  description: "피티홀릭짐 PT 진행방식과 트레이너별 가능 시간표를 확인하세요. 체력테스트, 식사 관리, 해부학 기반 자세 코칭. 성균관대역 도보 3분.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="진행방식"
        title="피티홀릭짐이 운동을 진행하는 방식"
        desc="체력테스트부터 해부학 기반 자세 코칭까지, 트레이너별 가능 시간도 함께 확인하세요."
      />

      <section className="py-16 md:py-24">
        <div className="wrap">
          <ProcessSteps />
        </div>
      </section>

      <section className="border-t border-line bg-bg-alt py-16 md:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="SCHEDULE"
            title="트레이너별 시간표"
            desc="트레이너를 선택하면 요일별 가능 시간을 확인할 수 있습니다."
          />
          <div className="mt-10">
            <ScheduleTabs />
          </div>
        </div>
      </section>
    </>
  );
}
