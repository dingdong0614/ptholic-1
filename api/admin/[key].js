/**
 * 관리자 전용 혼잡도 변경 페이지 (서버리스 함수로 렌더링)
 * URL: /api/admin/<ADMIN_KEY 값>
 *
 * 정적 HTML 파일로 만들지 않는 이유: 이 저장소는 Public GitHub 저장소라
 * 파일명에 비밀 문자열을 넣어 커밋하면 누구나 Git 기록에서 볼 수 있다.
 * 대신 이 함수는 요청이 들어올 때마다 ADMIN_KEY 환경변수 값과 URL의 key를
 * 서버 쪽에서만 비교하고, 일치할 때만 HTML을 즉석에서 만들어 응답한다.
 * 이 페이지의 URL과 내용 자체는 Git 저장소 어디에도 남지 않는다.
 */

const crypto = require("crypto");

function safeEqual(a, b) {
  const ah = crypto.createHash("sha256").update(String(a)).digest();
  const bh = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ah, bh);
}

function renderPage(adminKey) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>혼잡도 관리 | 피티홀릭짐</title>
<style>
  :root {
    --bg: #121212;
    --surface: #1c1c1c;
    --line: rgba(255, 255, 255, 0.1);
    --line-strong: rgba(255, 255, 255, 0.18);
    --text: #f2f0ec;
    --text-muted: #9c9a94;
    --accent: #ff5722;
    --accent-strong: #ff7a45;
    --lime: #c6ff3d;
    --amber: #ffb84d;
    --red: #ff4d4d;
    --font-body: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
  }
  .panel {
    width: 100%;
    max-width: 420px;
    margin: 24px;
    background: var(--surface);
    border: 1px solid var(--line);
    padding: 32px;
  }
  .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: var(--accent-strong);
    text-transform: uppercase;
    margin: 0 0 8px;
  }
  h1 { font-size: 1.3rem; margin: 0 0 24px; font-weight: 700; }
  .current {
    border: 1px solid var(--line-strong);
    padding: 16px;
    margin-bottom: 24px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  .current strong { color: var(--text); font-size: 1rem; transition: color 0.15s ease; }
  .current strong[data-level="low"] { color: var(--lime); }
  .current strong[data-level="mid"] { color: var(--amber); }
  .current strong[data-level="high"] { color: var(--red); }
  .buttons { display: grid; gap: 10px; }
  button.status-btn {
    padding: 14px;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.95rem;
    border: 1px solid var(--line-strong);
    background: transparent;
    color: var(--text);
    cursor: pointer;
    transition: transform 0.1s ease, border-color 0.15s ease;
  }
  button.status-btn:hover { border-color: var(--accent); }
  button.status-btn:active { transform: translateY(1px); }
  button.status-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  button.status-btn[data-level="low"] { border-left: 4px solid var(--lime); }
  button.status-btn[data-level="mid"] { border-left: 4px solid var(--amber); }
  button.status-btn[data-level="high"] { border-left: 4px solid var(--red); }
  .msg { min-height: 1.4em; font-size: 0.85rem; margin: 16px 0 0; color: var(--lime); }
  .msg[data-error="true"] { color: var(--accent); }
</style>
</head>
<body>
  <div class="panel">
    <p class="eyebrow">피티홀릭짐 · ADMIN</p>
    <h1>실시간 혼잡도 관리</h1>
    <div class="current">
      현재 상태: <strong id="curStatus">불러오는 중…</strong><br />
      마지막 업데이트: <span id="curUpdated">-</span>
    </div>
    <div class="buttons">
      <button class="status-btn" data-level="low" data-status="한산">한산</button>
      <button class="status-btn" data-level="mid" data-status="보통">보통</button>
      <button class="status-btn" data-level="high" data-status="혼잡">혼잡</button>
    </div>
    <p class="msg" id="msg" role="status" aria-live="polite"></p>
  </div>

  <script>
    (function () {
      var ADMIN_KEY = ${JSON.stringify(adminKey)};
      var curStatus = document.getElementById("curStatus");
      var curUpdated = document.getElementById("curUpdated");
      var msg = document.getElementById("msg");
      var buttons = document.querySelectorAll(".status-btn");
      var LEVELS = { 한산: "low", 보통: "mid", 혼잡: "high" };

      function fmtTime(iso) {
        if (!iso) return "-";
        var d = new Date(iso);
        return d.toLocaleString("ko-KR");
      }

      function applyStatus(status, updatedAt) {
        curStatus.textContent = status || "-";
        curStatus.dataset.level = LEVELS[status] || "";
        curUpdated.textContent = fmtTime(updatedAt);
      }

      function loadState() {
        fetch("/api/congestion", { cache: "no-store" })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            applyStatus(data.status, data.updatedAt);
          })
          .catch(function () {
            curStatus.textContent = "불러오기 실패";
          });
      }

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.disabled = true; });
          msg.dataset.error = "false";
          msg.textContent = "변경 중…";

          fetch("/api/congestion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-admin-key": ADMIN_KEY,
            },
            body: JSON.stringify({ status: btn.dataset.status }),
          })
            .then(function (r) {
              if (!r.ok) throw new Error("요청 실패");
              return r.json();
            })
            .then(function (data) {
              applyStatus(data.status, data.updatedAt);
              msg.dataset.error = "false";
              msg.textContent = "'" + data.status + "'(으)로 변경되었습니다.";
            })
            .catch(function () {
              msg.dataset.error = "true";
              msg.textContent = "변경에 실패했습니다. 다시 시도해주세요.";
            })
            .finally(function () {
              buttons.forEach(function (b) { b.disabled = false; });
            });
        });
      });

      loadState();
    })();
  </script>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  const key = req.query.key;
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || !key || typeof key !== "string" || !safeEqual(key, adminKey)) {
    res.status(404).send("Not Found");
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(renderPage(adminKey));
};
