import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE_CONFIG } from "@/data/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "피티홀릭짐 개인정보처리방침. 수집 항목, 이용 목적, 보유 기간, 정보주체의 권리 안내.",
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목 및 수집 방법",
    body: (
      <>
        <p>피티홀릭짐(이하 &ldquo;회사&rdquo;)은 홈페이지 문의 폼을 통해 아래 개인정보를 수집합니다.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>수집 항목: 이름, 연락처(휴대전화번호), 문의 유형, 문의 내용</li>
          <li>수집 방법: 홈페이지 문의 폼을 통한 이용자의 자발적 입력</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    body: (
      <p>
        수집한 개인정보는 PT 상담 및 무료 체험 신청 접수, 문의 사항에 대한 답변 및 안내, 서비스 관련 공지사항
        전달 목적으로만 이용하며, 목적 외 용도로는 이용하지 않습니다.
      </p>
    ),
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    body: (
      <p>
        원칙적으로 개인정보 수집 및 이용 목적이 달성된 후(문의 처리 완료 후) 해당 정보를 지체 없이 파기합니다.
        단, 관계 법령의 규정에 따라 보존할 필요가 있는 경우 회사는 관계 법령에서 정한 일정한 기간 동안 회원
        정보를 보관합니다.
      </p>
    ),
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: (
      <p>
        회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 이용자가 사전에 동의한 경우 또는
        법령의 규정에 의거한 경우는 예외로 합니다.
      </p>
    ),
  },
  {
    title: "5. 개인정보 처리의 위탁",
    body: (
      <>
        <p>회사는 원활한 문의 접수 및 처리를 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>수탁업체: Web3Forms — 위탁업무 내용: 문의 폼 데이터 전송 및 이메일 알림</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. 개인정보의 파기 절차 및 방법",
    body: (
      <p>
        이용자가 입력한 개인정보는 목적 달성 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및
        기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다. 전자적 파일 형태로 저장된
        개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
      </p>
    ),
  },
  {
    title: "7. 정보주체의 권리·의무 및 행사 방법",
    body: (
      <p>
        이용자는 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있으며, 아래 개인정보 보호책임자
        연락처로 요청하시면 지체 없이 조치합니다.
      </p>
    ),
  },
  {
    title: "8. 개인정보 보호책임자",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>성명 및 연락처: 대표 문의 채널(하단 참조)을 통해 안내드립니다.</li>
        <li>
          문의: {SITE_CONFIG.sns.instagramUrl} (인스타그램 DM) 또는{" "}
          <a href="/contact" className="underline">
            문의 페이지
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "9. 쿠키(Cookie)의 운영 및 거부",
    body: (
      <p>
        본 홈페이지는 현재 이용자 맞춤 광고나 방문 통계를 위한 별도의 쿠키·추적 도구를 사용하지 않습니다. 향후
        구글 애널리틱스 등 방문 통계 도구를 도입할 경우 본 방침에 그 사실과 목적을 명시합니다.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="개인정보처리방침"
        title="개인정보처리방침"
        desc="피티홀릭짐은 이용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다."
      />
      <section className="py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <p className="border border-line-strong bg-surface p-5 text-sm text-text-muted">
            본 페이지는 doion이 정리한 체크리스트를 기반으로 작성된 초안이며, 법적 자문이 아닙니다. 사업자등록번호,
            개인정보 보호책임자 성명·직통 연락처 등 일부 항목은 대표 확인 후 최종 반영이 필요합니다. 최종 게시
            전 전문가 검토를 권장합니다.
          </p>

          <div className="mt-10 space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl">{s.title}</h2>
                <div className="mt-3 text-sm leading-relaxed text-text-muted">{s.body}</div>
              </div>
            ))}
          </div>

          <p className="mt-12 font-mono text-xs text-text-faint">공고일자: 2026-08-24 / 시행일자: 2026-08-24</p>
        </div>
      </section>
    </>
  );
}
