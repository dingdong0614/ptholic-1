"use client";

import { useState } from "react";

/**
 * 블로그 공지 항목 목록. 모바일에서는 앞의 `visible`개만 보이고 "더 보기"로 펼친다.
 * 데스크톱(md 이상)은 항상 전부 보인다. JS가 없어도 내용은 HTML에 모두 들어 있다.
 */
export default function NoticeList({ items, visible = 3 }: { items: readonly string[]; visible?: number }) {
  const [open, setOpen] = useState(false);
  const hiddenCount = Math.max(0, items.length - visible);

  return (
    <>
      <ol id="notice-items" className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
        {items.map((it, i) => (
          <li key={it} className={!open && i >= visible ? "hidden md:list-item" : undefined}>
            {it}
          </li>
        ))}
      </ol>
      {hiddenCount > 0 && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls="notice-items"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 inline-flex min-h-[48px] items-center gap-1.5 text-[15px] font-bold text-[#1b1b1c] md:hidden"
        >
          {open ? "접기" : `공지 ${hiddenCount}개 더 보기`}
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}
