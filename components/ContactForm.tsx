"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

const PHONE_PATTERN = /^[0-9\-+ ]{9,14}$/;

export default function ContactForm() {
  const [status, setStatus] = useState<{ text: string; error: boolean }>({ text: "", error: false });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const type = String(data.get("type") || "").trim();
    const message = String(data.get("message") || "").trim();
    const privacyConsent = data.get("privacyConsent") === "on";

    if (!name || !phone || !message) {
      setStatus({ text: "이름, 연락처, 메시지를 모두 입력해주세요.", error: true });
      return;
    }
    if (!PHONE_PATTERN.test(phone)) {
      setStatus({ text: "연락처 형식을 확인해주세요. (예: 010-0000-0000)", error: true });
      return;
    }
    if (!privacyConsent) {
      setStatus({ text: "개인정보 수집·이용에 동의해주세요.", error: true });
      return;
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
          name,
          phone,
          문의유형: type,
          message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ text: `${name}님, 문의가 접수되었습니다. 빠르게 연락드리겠습니다.`, error: false });
        form.reset();
      } else {
        setStatus({ text: "전송에 실패했습니다. 인스타그램 DM이나 전화로 문의해주세요.", error: true });
      }
    } catch {
      setStatus({ text: "전송 중 오류가 발생했습니다. 인스타그램 DM이나 전화로 문의해주세요.", error: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-surface p-7 md:p-9">
      <h3 className="font-display text-xl">문의 남기기</h3>

      <label className="mt-6 block">
        <span className="text-sm text-text-muted">이름</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className="mt-1.5 w-full border border-line-strong bg-bg px-4 py-3 text-text outline-none focus:border-accent"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-sm text-text-muted">연락처</span>
        <input
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          placeholder="010-0000-0000"
          className="mt-1.5 w-full border border-line-strong bg-bg px-4 py-3 text-text outline-none focus:border-accent"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm text-text-muted">문의 유형</legend>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="PT 상담" defaultChecked /> PT 상담
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="헬스장 이용" /> 헬스장 이용
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="type" value="기타" /> 기타
          </label>
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="text-sm text-text-muted">메시지</span>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-1.5 w-full border border-line-strong bg-bg px-4 py-3 text-text outline-none focus:border-accent"
        />
      </label>

      <div className="mt-6 border border-line-strong p-4">
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="privacyConsent" required className="mt-1" />
          <span>
            개인정보 수집·이용에 동의합니다. <span className="text-accent-strong">(필수)</span>
          </span>
        </label>
        <p className="mt-2 text-xs leading-relaxed text-text-faint">
          수집 항목: 이름, 연락처, 문의 유형, 메시지 내용 · 수집 목적: PT 상담 및 문의 응대 · 보유 기간: 문의 처리
          완료 후 즉시 파기. 동의를 거부할 수 있으나, 미동의 시 문의 접수가 제한됩니다. 자세한 내용은{" "}
          <Link href="/privacy" className="underline hover:text-text-muted">
            개인정보처리방침
          </Link>
          을 참고하세요.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full bg-accent py-3.5 font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {submitting ? "전송 중..." : "문의 보내기"}
      </button>
      <p role="status" aria-live="polite" className={`mt-3 text-sm ${status.error ? "text-accent-strong" : "text-lime"}`}>
        {status.text}
      </p>
    </form>
  );
}
