# Scope — 라운드2 B2(verodesign): 토큰 SSOT/중복·미사용 (보수적, cross-brand zero diff)
canon §5 + CDD dev-best-practices.md. 토큰: primitive/semantic/themes.
1) 동일 의미+동일 해석값 **중복 토큰** → 하나로 합치고 alias만 유지(소비/
테마 참조 보존). 2) **미사용 토큰**(어떤 theme/component/소비자(app-girok
file:) 참조 0) → 후보표만(DEAD/USED/DEFER+근거); 삭제 대신 `.add/
deprecate.md` 절차 후보로 표기(이번 배치 실삭제는 cross-brand·소비자
참조 0 **확증**된 것만, 아니면 DEFER). 3) primitive 직접소비 발견 시
semantic 경유로(소비 영향 시 DEFER+보고). 토큰값/색/테마출력 **불변**,
**cross-brand zero diff**(brand-isolation), design-pkg dist/typography/
build-script 미접촉. 발견 없으면 "변경 없음"(수렴 신호). 스냅샷 vero-pre-b2.
검증: knip/build/typecheck 델타 악화 0, 테마 출력 diff 0. 응답≤400:
중복/미사용 토큰 판별표 + 실변경(있으면) + cross-brand 근거 + 검증.
