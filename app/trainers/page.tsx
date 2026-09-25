import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrainerTabs from "@/components/TrainerTabs";

export const metadata: Metadata = {
  title: "트레이너 소개",
  description:
    "피티홀릭짐 PT 트레이너 권영민, 안정호, 홍승범의 경력과 자격사항. 교정·재활, 기능성 트레이닝, 보디빌딩 전문. 성균관대역 도보 3분 수원 율전동 PT.",
  alternates: { canonical: "/trainers" },
};

export default function TrainersPage() {
  return (
    <>
      <PageHero
        photo={{ src: "/assets/img/facility/facility-6.jpg" }}
        crumb="트레이너"
        title="선생님 세 명을 소개해요"
        desc="교정·재활은 권영민, 기능성은 안정호, 보디빌딩은 홍승범 선생님. 블로그에 올린 경력과 자격을 그대로 옮겼어요."
      />
      <section className="py-12 md:py-20">
        <div className="wrap">
          <TrainerTabs />
        </div>
      </section>
    </>
  );
}
