/**
 * 헬스장 실시간 혼잡도 상태 조회/변경 API
 * GET  : 누구나 조회 가능 (메인 페이지 위젯이 사용)
 * POST : x-admin-key 헤더가 ADMIN_KEY 환경변수와 일치해야만 변경 가능 (관리자 페이지가 사용)
 *
 * 저장소는 Upstash Redis REST API (Vercel Marketplace "Upstash for Redis" 연동 시
 * 자동 주입되는 KV_REST_API_URL / KV_REST_API_TOKEN 환경변수 사용).
 */
import { NextRequest, NextResponse } from "next/server";

const KV_KEY = "gym:congestion";
const ALLOWED_STATUSES = ["한산", "보통", "혼잡", "마감"] as const;

function kvBase() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error("KV_REST_API_URL / KV_REST_API_TOKEN 환경변수가 설정되지 않았습니다.");
  }
  return { url, token };
}

async function kvGet(key: string) {
  const { url, token } = kvBase();
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV GET 실패: ${res.status}`);
  const data = await res.json();
  return data.result || null;
}

async function kvSet(key: string, value: string) {
  const { url, token } = kvBase();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["SET", key, value]),
  });
  if (!res.ok) throw new Error(`KV SET 실패: ${res.status}`);
}

export async function GET() {
  try {
    const raw = await kvGet(KV_KEY);
    const state = raw ? JSON.parse(raw) : { status: "보통", updatedAt: null };
    return NextResponse.json(state, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return NextResponse.json(
      { error: "상태를 불러오지 못했습니다.", detail: String((err as Error).message || err) },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "인증 실패" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const body = await req.json().catch(() => ({}));
  const status = body?.status;
  if (!ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `status는 ${ALLOWED_STATUSES.join(" / ")} 중 하나여야 합니다.` },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const state = { status, updatedAt: new Date().toISOString() };
  try {
    await kvSet(KV_KEY, JSON.stringify(state));
    return NextResponse.json(state, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return NextResponse.json(
      { error: "상태 저장에 실패했습니다.", detail: String((err as Error).message || err) },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
