"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POLL_MS = 60000;
const LEVELS: Record<string, "low" | "mid" | "high" | "closed"> = {
  한산: "low",
  보통: "mid",
  혼잡: "high",
  마감: "closed",
};

const LEVEL_COLOR: Record<string, string> = {
  low: "bg-lime",
  mid: "bg-amber",
  high: "bg-red",
  closed: "bg-text-faint",
};

type CongestionState = { status: string; updatedAt: string | null };

function fmtTime(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

function useCongestion() {
  const [data, setData] = useState<CongestionState | null>(null);
  const [loading, setLoading] = useState(false);
  const lastStatus = useRef<string | null>(null);
  const [flash, setFlash] = useState(false);

  const load = useCallback(async (manual = false) => {
    if (manual) setLoading(true);
    try {
      const res = await fetch("/api/congestion", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const json: CongestionState = await res.json();
      if (json?.status) {
        if (lastStatus.current !== null && lastStatus.current !== json.status) {
          setFlash(true);
          setTimeout(() => setFlash(false), 900);
        }
        lastStatus.current = json.status;
        setData(json);
      }
    } catch {
      // 조회 실패 시 조용히 무시 (사이트 전체 동작에 영향 없음)
    } finally {
      if (manual) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 마운트 시 최초 조회 + 60초 폴링
    load();
    const id = setInterval(() => load(), POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  return { data, loading, flash, refresh: () => load(true) };
}

export default function CongestionWidget({ compact = false }: { compact?: boolean }) {
  const { data, loading, flash, refresh } = useCongestion();
  if (!data) return null;

  const level = LEVELS[data.status] || "mid";

  if (compact) {
    return (
      <div className="flex items-center gap-2 border border-line-strong px-3 py-2 font-mono text-xs">
        <span className={`relative h-2 w-2 rounded-full ${LEVEL_COLOR[level]}`}>
          <AnimatePresence>
            {flash && (
              <motion.span
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className={`absolute inset-0 rounded-full ${LEVEL_COLOR[level]}`}
              />
            )}
          </AnimatePresence>
        </span>
        <span className="text-text-muted">지금</span>
        <span className="text-text">{data.status}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 border border-line-strong bg-surface/80 px-4 py-3 backdrop-blur-sm">
      <span className={`relative h-2.5 w-2.5 rounded-full ${LEVEL_COLOR[level]}`}>
        <AnimatePresence>
          {flash && (
            <motion.span
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className={`absolute inset-0 rounded-full ${LEVEL_COLOR[level]}`}
            />
          )}
        </AnimatePresence>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-[10px] tracking-[0.14em] text-accent-strong">LIVE · 지금 혼잡도</span>
        <span className="font-display text-base">{data.status}</span>
      </span>
      <span className="ml-2 flex items-center gap-2 border-l border-line-strong pl-3 font-mono text-[11px] text-text-faint">
        {fmtTime(data.updatedAt)} 기준
        <button
          type="button"
          onClick={refresh}
          aria-label="혼잡도 새로고침"
          className={`text-text-muted transition-transform hover:text-accent-strong ${loading ? "animate-spin" : ""}`}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 13c0-4.42-3.58-8-8-8zm-6 8c0-1.01.25-1.97.7-2.8L5.24 8.74A7.93 7.93 0 0 0 4 13c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z" />
          </svg>
        </button>
      </span>
    </div>
  );
}
