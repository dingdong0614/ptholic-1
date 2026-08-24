"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRICING } from "@/data/pricing";
import { won } from "@/lib/format";

export default function PricingTabs() {
  const [active, setActive] = useState<string>(PRICING.tables[0].id);
  const table = PRICING.tables.find((t) => t.id === active)!;

  return (
    <div>
      <div role="tablist" aria-label="가격표 종류" className="flex flex-wrap gap-2 border-b border-line pb-4">
        {PRICING.tables.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`border px-5 py-2.5 font-mono text-sm transition-colors ${
              active === t.id
                ? "border-accent bg-accent text-white"
                : "border-line-strong text-text-muted hover:border-accent-strong hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={table.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8"
        >
          <p className="text-text-muted">{table.desc}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {table.plans.map((p) => (
              <div key={p.sessions} className="border border-line bg-surface p-6">
                <span className="font-mono text-sm text-text-muted">
                  {p.sessions}
                  {p.unitLabel ?? "회"}
                </span>
                <p className="mt-2 font-display text-2xl">{won(p.price)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-8 font-mono text-xs text-text-faint">{PRICING.vatNote}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {PRICING.extras.map((e) => (
          <span key={e.label} className="border border-line-strong px-4 py-2 text-sm text-text-muted">
            {e.label} <strong className="text-text">{e.value}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}
