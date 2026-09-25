"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

const PHONE_PATTERN = /^[0-9\-+ ]{9,14}$/;
const LIMITS = { name: 30, message: 1000 };
const COOLDOWN_MS = 60_000; // 같은 브라우저에서 1분 내 재전송 방지
const COOLDOWN_KEY = "ptholic_contact_last";

const inputCls =
  "mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3.5 text-[16px] text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent-strong";

export default function ContactForm() {
  const [status, setStatus] = useState<{ text: string; error: boolean }>({ text: "", error: false });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot: 사람은 보지 못하는 칸. 값이 있으면 봇으로 보고 조용히 종료
    if (data.get("botcheck")) return;

    const name = String(data.get("name") || "").trim().slice(0, LIMITS.name);
    const phone = String(data.get("phone") || "").trim();
    const type = String(data.get("type") || "").trim();
    const message = String(data.get("message") || "").trim().slice(0, LIMITS.message);
    const privacyConsent = data.get("privacyConsent") === "on";

    if (!name || !phone || !message) {
      setStatus({ text: "이름, 연락처, 메시지를 모두 입력해 주세요.", error: true });
      return;
    }
    if (!PHONE_PATTERN.test(phone)) {
      setStatus({ text: "연락처 형식을 확인해 주세요. (예: 010-0000-0000)", error: true });
      return;
    }
    if (!["PT 상담", "헬스장 이용", "기타"].includes(type)) {
      setStatus({ text: "문의 유형을 골라 주세요.", error: true });
      return;
    }
    if (!privacyConsent) {
      setStatus({ text: "개인정보 수집·이용에 동의해 주세요.", error: true });
      return;
    }
    try {
      const last = Number(window.localStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        setStatus({ text: "방금 문의를 보내셨어요. 1분 뒤에 다시 시도해 주세요.", error: true });
        return;
      }
    } catch {
      /* 저장소 차단 환경은 통과 */
    }

    setSubmitting(true);
    setStatus({ text: "", error: false });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: SITE_CONFIG.contact.web3formsAccessKey,
          subject: `[피티홀릭짐 문의] ${type} - ${name}`,
          from_name: "피티홀릭짐 웹사이트 문의 폼",
          botcheck: false,
          name,
          phone,
          문의유형: type,
          message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ text: `${name}님, 문의가 접수됐어요. 확인하는 대로 연락드릴게요.`, error: false });
        form.reset();
        try {
          window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        } catch {
          /* noop */
        }
      } else {
        setStatus({ text: "전송에 실패했어요. 네이버 예약이나 인스타그램 DM으로 문의해 주세요.", error: true });
      }
    } catch {
      setStatus({ text: "전송 중 오류가 났어요. 네이버 예약이나 인스타그램 DM으로 문의해 주세요.", error: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card relative p-6 md:p-9">
      <h2 className="text-[24px] font-bold">문의 남기기</h2>
      <p className="mt-1 text-[15px] text-text-muted">남겨 주시면 확인 후 연락드립니다.</p>

      {/* honeypot (스크린리더·키보드에서도 숨김) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          비워 두세요
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-6 block">
        <span className="text-[15px] font-semibold">이름</span>
        <input type="text" name="name" required maxLength={LIMITS.name} autoComplete="name" className={inputCls} />
      </label>

      <label className="mt-5 block">
        <span className="text-[15px] font-semibold">연락처</span>
        <input
          type="tel"
          name="phone"
          required
          maxLength={14}
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          className={inputCls}
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-[15px] font-semibold">문의 유형</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["PT 상담", "헬스장 이용", "기타"].map((v, i) => (
            <label
              key={v}
              className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 text-[15px] has-[:checked]:border-accent-strong has-[:checked]:text-accent-strong"
            >
              <input type="radio" name="type" value={v} defaultChecked={i === 0} className="accent-[#ff5722]" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="text-[15px] font-semibold">메시지</span>
        <textarea
          name="message"
          rows={4}
          required
          maxLength={LIMITS.message}
          placeholder="목표, 가능한 시간대, 부상 이력 등을 적어 주시면 상담이 빨라져요."
          className={inputCls}
        />
      </label>

      <div className="mt-6 rounded-xl border border-line-strong p-4">
        <label className="flex min-h-[44px] items-start gap-3 text-[15px]">
          <input type="checkbox" name="privacyConsent" required className="mt-1.5 h-4 w-4 accent-[#ff5722]" />
          <span>
            개인정보 수집·이용에 동의합니다. <span className="font-semibold text-accent-strong">(필수)</span>
          </span>
        </label>
        <p className="mt-2 text-[13px] leading-relaxed text-text-faint">
          수집 항목: 이름, 연락처, 문의 유형, 메시지 내용 · 수집 목적: PT 상담 및 문의 응대 · 보유 기간: 문의 처리 완료 후
          즉시 파기. 동의를 거부할 수 있으나, 미동의 시 문의 접수가 제한됩니다. 자세한 내용은{" "}
          <Link href="/privacy" className="underline hover:text-text-muted">
            개인정보처리방침
          </Link>
          을 참고하세요.
        </p>
      </div>

      <button type="submit" disabled={submitting} className="btn btn-primary mt-6 w-full disabled:opacity-60">
        {submitting ? "보내는 중..." : "문의 보내기"}
      </button>
      <p role="status" aria-live="polite" className={`mt-3 text-[15px] ${status.error ? "text-accent-strong" : "text-lime"}`}>
        {status.text}
      </p>
    </form>
  );
}
