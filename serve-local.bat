@echo off
rem 로컬 프리뷰 — 이 폴더를 그대로 서빙한다. 파일을 고치면 새로고침만 하면 반영된다.
cd /d "%~dp0"
start "" http://localhost:8877/
python -m http.server 8877 --bind 127.0.0.1
