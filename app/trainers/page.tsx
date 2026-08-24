import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrainerTabs from "@/components/TrainerTabs";

export const metadata: Metadata = {
  title: "트레이너 소개",
  description: "피티홀릭짐 PT 강사진 권영민, 안정호, 홍승범 트레이너의 경력과 자격사항을 확인하세요. 성균관대역 도보 3분, 수원 율전동 헬스장.",
};

export default function TrainersPage() {
  return (
    <>
      <PageHero
        crumb="트레이너"
        title="PT 강사진 소개"
        desc="경력 10년 이상, 국가공인 자격을 갖춘 트레이너 3인이 각자의 전문 분야로 코칭합니다."
      />
      <section className="py-16 md:py-24">
        <div className="wrap">
          <TrainerTabs />
        </div>
      </section>
    </>
  );
}
