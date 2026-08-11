(function () {
  "use strict";

  const won = (n) => `${n.toLocaleString("ko-KR")}원`;
  const $ = (id) => document.getElementById(id);

  /* ---------------- header ---------------- */

  function initHeader() {
    const header = $("siteHeader");
    const toggle = $("navToggle");
    const nav = $("mainNav");
    if (!header || !toggle || !nav) return;

    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    });

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });

    const currentPage = location.pathname.split("/").pop() || "index.html";

    nav.querySelectorAll("a").forEach((a) => {
      const linkPage = a.getAttribute("href").split("#")[0] || "index.html";
      if (linkPage === currentPage) a.classList.add("active");

      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  /* ---------------- hero ---------------- */

  function renderHero() {
    const el = $("heroMedia");
    if (!el) return;
    el.style.backgroundImage = `url("${SITE_CONFIG.heroImage}")`;
  }

  /* ---------------- promotions ---------------- */

  function renderPromotions() {
    const el = $("promoBanner");
    if (!el) return;
    el.innerHTML = PROMOTIONS.map(
      (p) => `
      <div class="promo-card">
        <span class="promo-badge">${p.badge}</span>
        <h3>${p.title}</h3>
        <p class="promo-price">${won(p.price)}</p>
        <p class="promo-desc">${p.desc}</p>
      </div>`
    ).join("");
  }

  /* ---------------- pricing ---------------- */

  function renderPricing() {
    const tabsEl = $("pricingTabs");
    const panelsEl = $("pricingPanels");
    if (!tabsEl || !panelsEl) return;

    tabsEl.innerHTML = PRICING.tables
      .map(
        (t, i) => `
      <button class="pricing-tab" id="tab-${t.id}" role="tab"
        aria-selected="${i === 0}" aria-controls="panel-${t.id}" data-target="${t.id}">
        ${t.label}
      </button>`
      )
      .join("");

    panelsEl.innerHTML = PRICING.tables
      .map(
        (t, i) => `
      <div class="pricing-panel" id="panel-${t.id}" role="tabpanel" aria-labelledby="tab-${t.id}" ${i === 0 ? "" : "hidden"}>
        <p class="pricing-panel-desc">${t.desc}</p>
        <div class="price-table">
          ${t.plans
            .map(
              (p) => `
            <div class="price-cell">
              <span class="sessions">${p.sessions}${p.unitLabel ? p.unitLabel : "회"}</span>
              <span class="amount">${won(p.price)}</span>
            </div>`
            )
            .join("")}
        </div>
      </div>`
      )
      .join("");

    const noteEl = $("pricingNote");
    if (noteEl) noteEl.textContent = PRICING.vatNote;

    const extrasEl = $("extrasRow");
    if (extrasEl) {
      extrasEl.innerHTML = PRICING.extras
        .map((e) => `<span class="extra-chip">${e.label} <strong>${e.value}</strong></span>`)
        .join("");
    }

    tabsEl.querySelectorAll(".pricing-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        tabsEl.querySelectorAll(".pricing-tab").forEach((t) => t.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        panelsEl.querySelectorAll(".pricing-panel").forEach((p) => (p.hidden = true));
        $(`panel-${tab.dataset.target}`).hidden = false;
      });
    });
  }

  /* ---------------- home previews ---------------- */

  function renderHomePreviews() {
    const bentoEl = $("facilityBento");
    if (bentoEl) {
      bentoEl.innerHTML = GALLERY_PHOTOS.slice(0, 3)
        .map(
          (g, i) => `
        <figure class="bento-item${i === 0 ? " is-large" : ""}">
          <img src="${g.src}" alt="${g.alt}" loading="lazy" />
        </figure>`
        )
        .join("");
    }

    const trainerPreviewEl = $("trainerPreviewGrid");
    if (trainerPreviewEl) {
      trainerPreviewEl.innerHTML = TRAINERS.map(
        (t) => `
        <a class="trainer-preview-card" href="trainers.html">
          <div class="trainer-preview-photo">
            <img src="${t.photo}" alt="${t.name} 트레이너" loading="lazy" />
          </div>
          <div class="trainer-preview-info">
            <h3>${t.name}</h3>
            <p>${t.specialty}</p>
          </div>
        </a>`
      ).join("");
    }
  }

  /* ---------------- facility ---------------- */

  function renderFacility() {
    const galleryEl = $("galleryGrid");
    if (galleryEl) {
      galleryEl.innerHTML = GALLERY_PHOTOS.map(
        (g) => `
        <figure class="gallery-item">
          <img src="${g.src}" alt="${g.alt}" loading="lazy" />
        </figure>`
      ).join("");
    }

    const zoneEl = $("zoneGrid");
    if (zoneEl) {
      zoneEl.innerHTML = EQUIPMENT_ZONES.map(
        (z) => `<div class="zone-card"><h4>${z.name}</h4><p>${z.desc}</p></div>`
      ).join("");
    }
  }

  /* ---------------- trainers ---------------- */

  function renderTrainers() {
    const el = $("trainerGrid");
    if (!el) return;

    el.innerHTML = TRAINERS.map(
      (t, i) => `
      <article class="trainer-card">
        <div class="trainer-photo">
          <img src="${t.photo}" alt="${t.name} 트레이너" loading="lazy" />
        </div>
        <div class="trainer-body">
          <h3 class="trainer-name">${t.name}</h3>
          <p class="trainer-tagline">“${t.tagline}”</p>
          <span class="trainer-specialty">${t.specialty}</span>
          <button class="cert-toggle" aria-expanded="false" aria-controls="certs-${i}">
            <span class="cert-toggle-label">경력 · 자격 보기</span>
            <span class="chev" aria-hidden="true">⌄</span>
          </button>
          <div class="cert-list" id="certs-${i}">
            <p class="cert-group-title">경력</p>
            <ul>${t.career.map((c) => `<li>${c}</li>`).join("")}</ul>
            <p class="cert-group-title">자격사항</p>
            <ul>${t.certs.map((c) => `<li>${c}</li>`).join("")}</ul>
          </div>
        </div>
      </article>`
    ).join("");

    el.querySelectorAll(".cert-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.nextElementSibling.classList.toggle("open", !open);
        btn.querySelector(".cert-toggle-label").textContent = !open ? "경력 · 자격 접기" : "경력 · 자격 보기";
      });
    });
  }

  /* ---------------- process ---------------- */

  function renderProcess() {
    const el = $("processGrid");
    if (!el) return;
    el.innerHTML = PROCESS_STEPS.map(
      (s) => `
      <div class="process-step">
        <span class="step-no">${s.step}</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>`
    ).join("");
  }

  /* ---------------- trainer schedule ---------------- */

  function renderTrainerSchedule() {
    const tabsEl = $("scheduleTabs");
    const bodyEl = $("scheduleBody");
    if (!tabsEl || !bodyEl) return;

    const renderTable = (trainer) => `
      <table class="schedule-table">
        <tr><th>요일</th><th>가능 시간</th></tr>
        ${SCHEDULE_DAYS.map(
          (day) => `<tr><td>${day}</td><td>${trainer.schedule[day] ? trainer.schedule[day] : "협의 후 안내"}</td></tr>`
        ).join("")}
      </table>`;

    tabsEl.innerHTML = TRAINERS.map(
      (t, i) => `
      <button class="pricing-tab" id="schedule-tab-${i}" role="tab"
        aria-selected="${i === 0}" aria-controls="schedule-panel-${i}" data-target="${i}">
        ${t.name}
      </button>`
    ).join("");

    bodyEl.innerHTML = TRAINERS.map(
      (t, i) => `<div class="schedule-panel" id="schedule-panel-${i}" ${i === 0 ? "" : "hidden"}>${renderTable(t)}</div>`
    ).join("");

    tabsEl.querySelectorAll(".pricing-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        tabsEl.querySelectorAll(".pricing-tab").forEach((t) => t.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        bodyEl.querySelectorAll(".schedule-panel").forEach((p) => (p.hidden = true));
        $(`schedule-panel-${tab.dataset.target}`).hidden = false;
      });
    });
  }

  /* ---------------- reviews ---------------- */

  function renderReviews() {
    const el = $("reviewGrid");
    if (!el) return;
    el.innerHTML = TESTIMONIALS.map(
      (r) => `
      <article class="review-card">
        <p class="quote">${r.quote}</p>
        <p class="meta">${r.meta}</p>
      </article>`
    ).join("");
  }

  /* ---------------- location ---------------- */

  function renderLocation() {
    const addressEl = $("locationAddress");
    if (addressEl) addressEl.textContent = SITE_CONFIG.addressFull;

    const stationEl = $("locationStation");
    if (stationEl) stationEl.textContent = `📍 ${SITE_CONFIG.station}`;

    const hoursEl = $("locationHours");
    if (hoursEl) {
      hoursEl.innerHTML = `
        <li>${SITE_CONFIG.hours.weekday}</li>
        <li>${SITE_CONFIG.hours.weekend}</li>
        <li>${SITE_CONFIG.hours.notice}</li>`;
    }

    const snsEl = $("snsLinks");
    if (snsEl) {
      snsEl.innerHTML = `
        <a class="btn btn-outline" href="${SITE_CONFIG.sns.instagramUrl}" target="_blank" rel="noopener">인스타그램 ${SITE_CONFIG.sns.instagramHandle}</a>
        <a class="btn btn-outline" href="${SITE_CONFIG.sns.blogUrl}" target="_blank" rel="noopener">네이버 블로그</a>
        <a class="btn btn-primary" href="${SITE_CONFIG.sns.reservationUrl}" target="_blank" rel="noopener">네이버 예약</a>`;
    }

    const mapFrame = $("mapFrame");
    if (mapFrame) mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.mapQuery)}&output=embed`;

    const mapCard = $("mapCard");
    if (mapCard) mapCard.href = SITE_CONFIG.sns.mapUrl;

    const heroReserveBtn = $("heroReserveBtn");
    if (heroReserveBtn) heroReserveBtn.href = SITE_CONFIG.sns.reservationUrl;

    const trialCtaBtn = $("trialCtaBtn");
    if (trialCtaBtn) trialCtaBtn.href = SITE_CONFIG.sns.reservationUrl;

    const footerAddress = $("footerAddress");
    if (footerAddress) footerAddress.textContent = SITE_CONFIG.addressFull;

    const footerHours = $("footerHours");
    if (footerHours) footerHours.textContent = `${SITE_CONFIG.hours.weekday} / ${SITE_CONFIG.hours.weekend}`;

    const footerSnsEl = $("footerSnsLinks");
    if (footerSnsEl) {
      footerSnsEl.innerHTML = `
        <a href="${SITE_CONFIG.sns.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
        <a href="${SITE_CONFIG.sns.blogUrl}" target="_blank" rel="noopener">Naver Blog</a>
        <a href="${SITE_CONFIG.sns.reservationUrl}" target="_blank" rel="noopener">Naver Booking</a>`;
    }

    const footerYear = $("footerYear");
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  /* ---------------- FAQ accordion ---------------- */

  function renderFAQ() {
    const el = $("faqAccordion");
    if (!el) return;
    el.innerHTML = FAQ.map(
      (f, i) => `
      <div class="accordion-item">
        <h3>
          <button class="accordion-trigger" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
            <span class="q-mark">Q</span> ${f.q}
            <span class="plus" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="accordion-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">
          <p>${f.a}</p>
        </div>
      </div>`
    ).join("");

    el.querySelectorAll(".accordion-trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.nextElementSibling.classList.toggle("open", !open);
      });
    });
  }

  /* ---------------- contact form ---------------- */

  function initContactForm() {
    const form = $("contactForm");
    const status = $("formStatus");
    if (!form || !status) return;
    const phonePattern = /^[0-9\-+ ]{9,14}$/;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const type = String(data.get("type") || "").trim();
      const message = String(data.get("message") || "").trim();
      const privacyConsent = form.elements["privacyConsent"] && form.elements["privacyConsent"].checked;

      if (!name || !phone || !message) {
        status.dataset.error = "true";
        status.textContent = "이름, 연락처, 메시지를 모두 입력해주세요.";
        return;
      }
      if (!phonePattern.test(phone)) {
        status.dataset.error = "true";
        status.textContent = "연락처 형식을 확인해주세요. (예: 010-0000-0000)";
        return;
      }
      if (!privacyConsent) {
        status.dataset.error = "true";
        status.textContent = "개인정보 수집·이용에 동의해주세요.";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "전송 중...";
      status.dataset.error = "false";
      status.textContent = "";

      fetch("https://api.web3forms.com/submit", {
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
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            status.dataset.error = "false";
            status.textContent = `${name}님, 문의가 접수되었습니다. 빠르게 연락드리겠습니다.`;
            form.reset();
          } else {
            status.dataset.error = "true";
            status.textContent = "전송에 실패했습니다. 인스타그램 DM이나 전화로 문의해주세요.";
          }
        })
        .catch(() => {
          status.dataset.error = "true";
          status.textContent = "전송 중 오류가 발생했습니다. 인스타그램 DM이나 전화로 문의해주세요.";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "문의 보내기";
        });
    });
  }

  /* ---------------- init ---------------- */

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    renderHero();
    renderHomePreviews();
    renderPromotions();
    renderPricing();
    renderFacility();
    renderTrainers();
    renderProcess();
    renderTrainerSchedule();
    renderReviews();
    renderLocation();
    renderFAQ();
    initContactForm();
  });
})();
