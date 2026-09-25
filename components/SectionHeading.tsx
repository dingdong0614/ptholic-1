import { RevealOnScroll } from "@/components/Reveal";

/** 섹션 제목. eyebrow는 호환용으로만 받고 화면에 그리지 않는다(영문 소라벨 반복 금지). */
export default function SectionHeading({
  title,
  desc,
  action,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  action?: React.ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <RevealOnScroll>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="max-w-2xl">
          <Tag className="t-h2">{title}</Tag>
          {desc && <p className="mt-4 text-text-muted">{desc}</p>}
        </div>
        {action}
      </div>
    </RevealOnScroll>
  );
}
