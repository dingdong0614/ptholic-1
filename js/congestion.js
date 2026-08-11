/**
 * 메인 페이지 "지금 혼잡도" 위젯
 * /api/congestion(GET)에서 상태를 읽어와 표시하고, 60초마다 자동 갱신합니다.
 * 위젯의 새로고침 버튼을 누르면 그 즉시 다시 조회합니다.
 * 관리자 페이지(/api/admin/<키>)에서 상태를 바꾸면 다음 갱신 시 반영됩니다.
 */
(function () {
  "use strict";

  const POLL_MS = 60000;

  const LEVELS = { 한산: "low", 보통: "mid", 혼잡: "high" };

  let lastStatus = null;

  function fmtTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  }

  function render(widget, data) {
    const level = LEVELS[data.status] || "mid";
    const changed = lastStatus !== null && lastStatus !== data.status;

    widget.dataset.level = level;

    const statusEl = document.getElementById("congestionStatus");
    const updatedEl = document.getElementById("congestionUpdated");
    if (statusEl) statusEl.textContent = data.status;
    if (updatedEl) {
      const t = fmtTime(data.updatedAt);
      updatedEl.textContent = t ? `${t} 기준` : "";
    }

    widget.hidden = false;

    if (changed) {
      widget.classList.remove("is-flash");
      void widget.offsetWidth; // 애니메이션 재시작을 위한 강제 리플로우
      widget.classList.add("is-flash");
    }
    lastStatus = data.status;
  }

  function loadState(opts) {
    const manual = !!(opts && opts.manual);
    const widget = document.getElementById("congestionWidget");
    if (!widget) return;

    const refreshBtn = document.getElementById("congestionRefresh");
    if (manual && refreshBtn) refreshBtn.classList.add("is-loading");

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
      })
      .finally(() => {
        if (manual && refreshBtn) refreshBtn.classList.remove("is-loading");
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    setInterval(loadState, POLL_MS);

    const refreshBtn = document.getElementById("congestionRefresh");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => loadState({ manual: true }));
    }
  });
})();
