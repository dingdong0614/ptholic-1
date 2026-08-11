/**
 * 메인 페이지 "지금 혼잡도" 위젯
 * /api/congestion(GET)에서 상태를 읽어와 표시하고, 60초마다 갱신합니다.
 * 관리자 페이지(/api/admin/<키>)에서 상태를 바꾸면 다음 갱신 시 반영됩니다.
 */
(function () {
  "use strict";

  const POLL_MS = 60000;

  const LEVELS = {
    한산: { level: "low", icon: "🟢" },
    보통: { level: "mid", icon: "🟡" },
    혼잡: { level: "high", icon: "🔴" },
  };

  function fmtTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  }

  function render(widget, data) {
    const meta = LEVELS[data.status] || LEVELS["보통"];
    widget.dataset.level = meta.level;
    const iconEl = document.getElementById("congestionIcon");
    const statusEl = document.getElementById("congestionStatus");
    const updatedEl = document.getElementById("congestionUpdated");
    if (iconEl) iconEl.textContent = meta.icon;
    if (statusEl) statusEl.textContent = data.status;
    if (updatedEl) {
      const t = fmtTime(data.updatedAt);
      updatedEl.textContent = t ? `마지막 업데이트 ${t}` : "";
    }
    widget.hidden = false;
  }

  function loadState() {
    const widget = document.getElementById("congestionWidget");
    if (!widget) return;

    fetch("/api/congestion", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("congestion fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data && data.status) render(widget, data);
      })
      .catch(() => {
        // 조회 실패 시 위젯을 표시하지 않고 조용히 무시합니다 (사이트 전체 동작에는 영향 없음).
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    setInterval(loadState, POLL_MS);
  });
})();
