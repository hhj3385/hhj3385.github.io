# hhj3385.github.io

허호재(Hojae Huh) 개인 포트폴리오 · CV 사이트. 순수 정적 HTML/CSS + 최소 JS, GitHub Pages(main 브랜치 루트)로 배포.

## 로컬에서 수정하기

1. `index.html`(내용 + 상단 `<style>` 스타일) · `script.js`(프로젝트 데이터 `PROJECTS`, 타이핑·카운트업·탭·테마)를 편집한다. 빌드 도구 없음. 스타일을 HTML 안에 둔 이유는 렌더 차단 요청을 없애기 위해서다.
2. `index.html`을 브라우저로 열어 확인한다. (또는 `python -m http.server 8877` 후 http://localhost:8877 — 포트는 비어 있는 아무 번호나)
3. `git add -A && git commit -m "..." && git push` → 1~2분 뒤 https://hhj3385.github.io 반영.

## 공개 수위

발주 기관·사업 실명, 계약 금액, 진행 중인 제안, 사내 시스템 실명, 개인 연락처(이메일 제외)는 싣지 않는다. 사업은 일반화된 명칭으로만 표기한다. 배포 전 점검용 키워드 목록은 공개 저장소 밖(개인 노트)에 둔다.
