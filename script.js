/* hojae-portfolio — 최소 JS
   1) 아이콘 인라인  2) 헤드라인 타이핑  3) 통계 카운트업
   4) 프로젝트 탭·캐러셀·슬라이더  5) 상세 카드 렌더
   6) 네비 슬라이딩 밑줄(스크롤 추적)  7) 테마 토글 */
(function () {
  "use strict";
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. 아이콘 (lucide 경로 인라인) ── */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  };
  const icon = (n, s, cls) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${cls || ""}" style="flex-shrink:0">${ICONS[n] || ""}</svg>`;
  document.querySelectorAll("i[data-lucide]").forEach((el) => { el.outerHTML = icon(el.dataset.lucide, +el.dataset.size || 16, el.className); });

  /* ── 2. 헤드라인 타이핑 ── */
  const SEGS = [{ t: "데이터를 " }, { t: "AI가 활용 가능한 자산", c: true }, { t: "으로," }, { br: true }, { t: "만드는 일을 합니다" }];
  const TOTAL = SEGS.reduce((n, s) => n + (s.t ? s.t.length : 0), 0);
  const head = document.getElementById("headline");
  function drawHead(n) {
    let left = n, html = "";
    const done = n >= TOTAL;
    for (const s of SEGS) {
      if (s.br) { if (left > 0 || done) html += "<br>"; continue; }
      const take = Math.max(0, Math.min(s.t.length, left)); left -= take;
      html += s.c ? `<span class="accent">${s.t.slice(0, take)}</span>` : s.t.slice(0, take);
    }
    if (!done) html += '<span class="caret" aria-hidden="true"></span>';
    head.innerHTML = html;
  }
  if (REDUCED) drawHead(TOTAL);
  else { let n = 0; drawHead(0); const iv = setInterval(() => { n++; drawHead(n); if (n >= TOTAL) clearInterval(iv); }, 36); }

  /* ── 3. 카운트업 ── */
  const fmt = (v) => v >= 10000 ? (v / 10000).toLocaleString("ko-KR", { maximumFractionDigits: 1 }) + "만" : v.toLocaleString("ko-KR");
  document.querySelectorAll("[data-count]").forEach((el) => {
    const v = +el.dataset.count;
    if (REDUCED) { el.textContent = fmt(v); return; }
    const t0 = performance.now(), dur = 1100;
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(Math.round(v * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });

  /* ── 프로젝트 데이터 (마스킹 적용: 발주처 실명·금액 없음) ── */
  const KIND = { biz: "사업", dev: "개발", research: "연구" };
  const PROJECTS = [
    { id: "kb", kind: "dev", title: "사내 지식 저장소 플랫폼", when: "2025 – 현재", meta: "1인 기획·개발·운영", thumb: "kb",
      problem: "제안서·기술문서 수천 건이 파일 단위로 흩어져 있어, 과거 산출물을 찾고 재사용하는 일이 사람의 기억에 의존했습니다.",
      did: "문서를 슬라이드 단위 지식으로 구조화하고 하이브리드 검색(키워드 + 벡터, RRF) 위에 RAG를 얹어 서비스. 문서 접근권한(ACL) 체계, 검색 리랭킹, 문서 간 관계를 시각화하는 지식 지도를 탑재해 실사용자 대상으로 운영 중입니다.",
      result: "LLM으로 문서 간 관계를 자동 생성하면서, 자동 생성 지식의 검증 부재 문제를 운영에서 직접 관찰했습니다. 이것이 현재 관심 연구의 출발점입니다.",
      metrics: [["슬라이드 지식", "7,000건"], ["LLM 자동 관계", "9,700건"], ["코드", "1.9만 줄"], ["자동화 테스트", "222건"]],
      tags: ["Python", "FastAPI", "TypeScript/React", "PostgreSQL", "pgvector", "BGE-M3", "온프레미스 LLM"] },
    { id: "meta", kind: "research", title: "정형 데이터 메타데이터 자동 생성 연구", when: "2026", meta: "사내 연구", thumb: "meta",
      problem: "카탈로그에 등록되는 표 데이터에 사람이 비즈니스 메타데이터(설명·의미)를 일일이 쓰기 어렵고, 외부 API 없이 폐쇄 환경에서 해결해야 했습니다.",
      did: "공공 데이터셋을 대상으로 온프레미스 12B급 소형 LLM만으로 프로파일링 → 메타데이터 생성 파이프라인을 구축. 모델 비교 실측 50회로 모델을 선정했습니다.",
      result: "전건 생성에 성공했고, 자동 품질 지표와 사람 검토 결과를 대조해 지표가 실제 오류를 탐지하지 못함을 정량 확인 → HITL 검증 설계 필요성을 도출했습니다.",
      metrics: [["데이터셋", "49개"], ["행", "39만"], ["생성 실패", "0건"], ["건당 소요", "약 6초"]],
      tags: ["Python", "Gemma 12B", "Ollama", "프로파일링", "품질 평가", "HITL"] },
    { id: "airport", kind: "biz", title: "국내 대형 공항 데이터플랫폼 구축 사업", when: "2026 – 현재", meta: "제안 → 수행", thumb: "dw",
      problem: "공항 운영 전반의 데이터를 통합해 분석·AI 활용이 가능한 대규모 데이터플랫폼을 새로 구축하는 사업으로, 제안 단계부터 아키텍처의 설득력이 요구되었습니다.",
      did: "제안 단계에서 시스템 아키텍처와 데이터웨어하우스 설계, 제안서 작성을 주도했습니다. 수행 단계에서는 메타데이터 표준 관리 파트의 설계·구현과 사업 관리를 맡고 있습니다.",
      result: "제안 수주. 대규모 구축 사업을 수행 중입니다.",
      metrics: [["제안", "수주"], ["담당", "아키텍처·DW·메타데이터 표준"]],
      tags: ["시스템 아키텍처", "DW 모델링", "메타데이터 표준", "데이터 카탈로그", "사업 관리"] },
    { id: "nat", kind: "biz", title: "국가 데이터 통합플랫폼 운영·고도화 사업 (정부산하기관)", when: "2025 – 2026", meta: "운영 → 고도화 제안", thumb: "catalog",
      problem: "국가 단위 데이터 통합플랫폼의 운영에는 보안 산출물과 서비스 요청·변경 관리가 상시 요구되고, 고도화 단계에서는 AI 에이전트가 활용할 수 있는 카탈로그가 필요했습니다.",
      did: "운영 사업에서 보안 산출물을 전담하고 사업단 ITSM(서비스 요청·변경 관리)을 구축했습니다. 고도화 제안에서는 AI-Ready 데이터 카탈로그(DCAT-AP)와 보안 요구사항 설계에 참여했습니다.",
      result: "운영 보안 산출물 전담, ITSM 구축, AI-Ready 카탈로그 설계안 제출.",
      metrics: [["보안 산출물", "전담"], ["ITSM", "구축"], ["카탈로그", "DCAT-AP 설계"]],
      tags: ["DCAT-AP", "ITSM", "보안 요구사항", "폐쇄망 아키텍처"] },
    { id: "tf", kind: "dev", title: "사내 AI 도입 TF — 전사 AI 코딩 표준", when: "2026", meta: "경영진 직속 TF", thumb: "std",
      problem: "AI 코딩 도구를 팀마다 제각각 쓰면서 코드 품질과 보안 기준이 흔들렸습니다.",
      did: "전사 AI 코딩 표준 체계(작업 절차, 검토 규칙, 금지 사항, 온보딩 문서)를 설계하고 배포했습니다.",
      result: "전사 표준 배포. 표준을 따르는 프로젝트 템플릿과 온보딩 절차를 정착시켰습니다.",
      metrics: [["산출물", "표준 체계·온보딩"], ["범위", "전사"]],
      tags: ["AI 코딩 표준", "개발 프로세스", "문서화"] },
  ];

  /* ── 개념도 썸네일 (직접 그린 SVG 도식) ── */
  const THUMBS = {
    kb: `<svg viewBox="0 0 160 100"><rect class="g-fill" x="10" y="14" width="44" height="72" rx="4"/><rect class="g-box" x="16" y="22" width="32" height="8" rx="2"/><rect class="g-box" x="16" y="36" width="32" height="8" rx="2"/><rect class="g-box" x="16" y="50" width="32" height="8" rx="2"/><rect class="g-box" x="16" y="64" width="32" height="8" rx="2"/><path class="g-line" d="M54 50h22"/><rect class="g-box" x="76" y="36" width="34" height="28" rx="6"/><text class="g-txt" x="93" y="53" text-anchor="middle">검색+RAG</text><path class="g-line" d="M110 50h18"/><circle class="g-dot" cx="138" cy="30" r="4"/><circle class="g-dot" cx="146" cy="50" r="4"/><circle class="g-dot" cx="138" cy="70" r="4"/><path class="g-line" d="M138 30l8 20-8 20"/></svg>`,
    meta: `<svg viewBox="0 0 160 100"><rect class="g-box" x="12" y="20" width="56" height="60" rx="4"/><path class="g-line" d="M12 34h56M12 48h56M12 62h56M31 20v60M50 20v60"/><path class="g-line" d="M68 50h20"/><rect class="g-fill" x="88" y="36" width="30" height="28" rx="14"/><text class="g-txt" x="103" y="53" text-anchor="middle">LLM</text><path class="g-line" d="M118 50h12"/><rect class="g-box" x="130" y="30" width="20" height="40" rx="3"/><path class="g-line" d="M134 40h12M134 48h12M134 56h8"/></svg>`,
    dw: `<svg viewBox="0 0 160 100"><rect class="g-box" x="10" y="16" width="26" height="16" rx="3"/><rect class="g-box" x="10" y="42" width="26" height="16" rx="3"/><rect class="g-box" x="10" y="68" width="26" height="16" rx="3"/><path class="g-line" d="M36 24h16v26h-16M36 50h16M36 76h16v-26h-16"/><rect class="g-fill" x="60" y="30" width="40" height="40" rx="6"/><text class="g-txt" x="80" y="53" text-anchor="middle">DW</text><path class="g-line" d="M100 50h14"/><rect class="g-box" x="114" y="22" width="36" height="12" rx="3"/><rect class="g-box" x="114" y="44" width="36" height="12" rx="3"/><rect class="g-box" x="114" y="66" width="36" height="12" rx="3"/><path class="g-line" d="M114 28h-8v44h8"/></svg>`,
    catalog: `<svg viewBox="0 0 160 100"><rect class="g-fill" x="20" y="18" width="120" height="64" rx="6"/><rect class="g-box" x="30" y="28" width="30" height="20" rx="3"/><rect class="g-box" x="65" y="28" width="30" height="20" rx="3"/><rect class="g-box" x="100" y="28" width="30" height="20" rx="3"/><rect class="g-box" x="30" y="54" width="30" height="20" rx="3"/><rect class="g-box" x="65" y="54" width="30" height="20" rx="3"/><rect class="g-box" x="100" y="54" width="30" height="20" rx="3"/><circle class="g-dot" cx="45" cy="38" r="2.5"/><circle class="g-dot" cx="80" cy="64" r="2.5"/><circle class="g-dot" cx="115" cy="38" r="2.5"/><text class="g-txt" x="80" y="92" text-anchor="middle">DCAT-AP</text></svg>`,
    std: `<svg viewBox="0 0 160 100"><rect class="g-box" x="30" y="14" width="100" height="72" rx="6"/><path class="g-line" d="M44 32h72M44 46h56M44 60h64M44 74h40"/><circle class="g-dot" cx="38" cy="32" r="2.5"/><circle class="g-dot" cx="38" cy="46" r="2.5"/><circle class="g-dot" cx="38" cy="60" r="2.5"/><circle class="g-dot" cx="38" cy="74" r="2.5"/><path class="g-line" d="M112 66l6 6 12-12"/></svg>`,
  };

  /* ── 4. 프로젝트 탭 · 캐러셀 · 슬라이더 ── */
  const rail = document.getElementById("rail"), slider = document.getElementById("slider");
  const tabs = document.getElementById("tabs"), tabInd = document.getElementById("tabInd");
  function renderRail(tab) {
    const pool = tab === "all" ? PROJECTS : PROJECTS.filter((p) => p.kind === tab);
    rail.innerHTML = pool.map((p) => `<a class="pcard" href="#d-${p.id}">
        <div class="thumb">${THUMBS[p.thumb] || ""}</div>
        <p class="tt">${p.title}</p>
        <span class="mt">${p.when} · ${p.meta}</span>
        <span class="fm ${p.kind}">${KIND[p.kind]}</span></a>`).join("");
    requestAnimationFrame(measureRail);
  }
  function measureRail() {
    const max = rail.scrollWidth - rail.clientWidth;
    slider.style.display = max > 0 ? "" : "none";
    slider.value = max > 0 ? Math.round(rail.scrollLeft / max * 1000) : 0;
  }
  rail.addEventListener("scroll", measureRail);
  new ResizeObserver(measureRail).observe(rail);
  slider.addEventListener("input", () => {
    const max = rail.scrollWidth - rail.clientWidth, left = slider.value / 1000 * max;
    if (Math.abs(left - rail.scrollLeft) > rail.clientWidth * .4) rail.scrollTo({ left, behavior: "smooth" }); else rail.scrollLeft = left;
  });
  function moveInd(ind, el) {
    if (!el) { ind.style.opacity = 0; return; }
    ind.style.opacity = 1; ind.style.transform = `translateX(${el.offsetLeft}px) scaleX(${el.offsetWidth / 100})`;
  }
  tabs.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
    tabs.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active"); moveInd(tabInd, b); renderRail(b.dataset.tab);
  }));
  renderRail("all");

  /* ── 5. 상세 카드 ── */
  document.getElementById("details").innerHTML = PROJECTS.map((p) => `<article class="dcard" id="d-${p.id}">
      <div class="l">
        <div class="top"><span class="chip ${p.kind}">${icon("star", 11)} ${KIND[p.kind]}</span><span class="dt">${p.when} · ${p.meta}</span></div>
        <p class="tt">${p.title}</p>
        <dl class="pdw"><dt>문제</dt><dd>${p.problem}</dd><dt>한 일</dt><dd>${p.did}</dd><dt>결과</dt><dd>${p.result}</dd></dl>
      </div>
      <div class="r">
        <div class="metrics">${p.metrics.map(([k, v]) => `<span>${k}<b>${v}</b></span>`).join("")}</div>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </article>`).join("");

  /* ── 6. 네비 슬라이딩 밑줄 — 스크롤 위치로 활성 섹션 추적 ── */
  const gnb = document.getElementById("gnb"), navInd = document.getElementById("navInd");
  const links = [...gnb.querySelectorAll("a[data-sec]")];
  const secs = links.map((a) => document.getElementById(a.dataset.sec === "top" ? "main" : a.dataset.sec));
  function setActive(a) {
    links.forEach((x) => x.classList.toggle("active", x === a));
    moveInd(navInd, a);
    a.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  function onScroll() {
    const y = scrollY + 140;
    let cur = links[0];
    secs.forEach((s, i) => { if (s && s.offsetTop <= y) cur = links[i]; });
    if (!cur.classList.contains("active")) setActive(cur);
  }
  addEventListener("scroll", onScroll, { passive: true });
  const placeInds = () => { moveInd(navInd, gnb.querySelector("a.active")); moveInd(tabInd, tabs.querySelector("button.active")); };
  placeInds(); if (document.fonts) document.fonts.ready.then(placeInds); addEventListener("resize", placeInds);
  onScroll();

  /* ── 7. 테마 토글 ── */
  const KEY = "theme", root = document.documentElement, btn = document.getElementById("themeBtn");
  const apply = (v) => { if (v === "dark" || v === "light") root.setAttribute("data-theme", v); else root.removeAttribute("data-theme"); };
  try { apply(localStorage.getItem(KEY)); } catch (e) { /* ignore */ }
  btn.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    apply(next); try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
  });
})();
