/**
 * 헬스장 실시간 혼잡도 상태 조회/변경 API
 * GET  : 누구나 조회 가능 (메인 페이지 위젯이 사용)
 * POST : x-admin-key 헤더가 ADMIN_KEY 환경변수와 일치해야만 변경 가능 (관리자 페이지가 사용)
 *
 * 저장소는 Upstash Redis REST API (Vercel Marketplace "Upstash for Redis" 연동 시
 * 자동 주입되는 KV_REST_API_URL / KV_REST_API_TOKEN 환경변수 사용). 별도 npm 패키지 불필요.
 */

const KV_KEY = "gym:congestion";
const ALLOWED_STATUSES = ["한산", "보통", "혼잡"];

function kvBase() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error("KV_REST_API_URL / KV_REST_API_TOKEN 환경변수가 설정되지 않았습니다.");
  }
  return { url, token };
}

async function kvGet(key) {
  const { url, token } = kvBase();
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`KV GET 실패: ${res.status}`);
  const data = await res.json();
  return data.result || null;
}

async function kvSet(key, value) {
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

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body !== undefined) {
      try {
        resolve(typeof req.body === "string" ? JSON.parse(req.body) : req.body);
      } catch {
        resolve({});
      }
      return;
    }
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    try {
      const raw = await kvGet(KV_KEY);
      const state = raw ? JSON.parse(raw) : { status: "보통", updatedAt: null };
      res.status(200).json(state);
    } catch (err) {
      res.status(500).json({ error: "상태를 불러오지 못했습니다.", detail: String(err.message || err) });
    }
    return;
  }

  if (req.method === "POST") {
    const adminKey = req.headers["x-admin-key"];
    if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
      res.status(401).json({ error: "인증 실패" });
      return;
    }

    const body = await readBody(req);
    const status = body && body.status;
    if (!ALLOWED_STATUSES.includes(status)) {
      res.status(400).json({ error: `status는 ${ALLOWED_STATUSES.join(" / ")} 중 하나여야 합니다.` });
      return;
    }

    const state = { status, updatedAt: new Date().toISOString() };
    try {
      await kvSet(KV_KEY, JSON.stringify(state));
      res.status(200).json(state);
    } catch (err) {
      res.status(500).json({ error: "상태 저장에 실패했습니다.", detail: String(err.message || err) });
    }
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.status(405).json({ error: "허용되지 않은 메서드입니다." });
};
