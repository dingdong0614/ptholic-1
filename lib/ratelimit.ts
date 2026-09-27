import { createHash } from "node:crypto";

// 의존성 없는 인메모리 rate limit(인스턴스별 sliding window). Upstash 없이도 무차별 대입을 늦춘다.
const mem = new Map<string, number[]>();

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function rateLimit(req: Request, opts: { name: string; limit: number; windowMs: number; key?: string }) {
  const id = createHash("sha256").update(opts.key || clientIp(req)).digest("hex").slice(0, 32);
  const k = `${opts.name}:${id}`;
  const now = Date.now();
  const arr = (mem.get(k) || []).filter((t) => now - t < opts.windowMs);
  arr.push(now);
  mem.set(k, arr);
  if (mem.size > 5000) for (const [kk, v] of mem) if (!v.length || now - v[v.length - 1] > opts.windowMs) mem.delete(kk);
  return { ok: arr.length <= opts.limit, retryAfter: Math.ceil(opts.windowMs / 1000) };
}
