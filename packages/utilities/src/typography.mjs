import { tokenPathToCssVar } from '../css-vars.mjs';

const WEIGHT_ALIAS = { 400: 'normal', 500: 'medium', 600: 'semibold', 700: 'bold' };

export function generateTypography(flat) {
  const rules = [];

  for (const t of flat) {
    if (t.path[0] !== 'font') continue;
    const v = `var(${tokenPathToCssVar(t.path)})`;

    if (t.path[1] === 'size') {
      rules.push(`.vds-text-${t.path[2]} { font-size: ${v}; }`);
    } else if (t.path[1] === 'weight') {
      const numeric = t.path[2];
      rules.push(`.vds-font-${numeric} { font-weight: ${v}; }`);
      const alias = WEIGHT_ALIAS[numeric];
      if (alias) rules.push(`.vds-font-${alias} { font-weight: ${v}; }`);
    } else if (t.path[1] === 'lineHeight') {
      rules.push(`.vds-leading-${t.path[2]} { line-height: ${v}; }`);
    } else if (t.path[1] === 'letterSpacing') {
      rules.push(`.vds-tracking-${t.path[2]} { letter-spacing: ${v}; }`);
    } else if (t.path[1] === 'family') {
      rules.push(`.vds-font-${t.path[2]} { font-family: ${v}; }`);
    }
  }

  rules.push(`.vds-text-left { text-align: left; }`);
  rules.push(`.vds-text-center { text-align: center; }`);
  rules.push(`.vds-text-right { text-align: right; }`);
  rules.push(`.vds-text-justify { text-align: justify; }`);
  rules.push(`.vds-text-start { text-align: start; }`);
  rules.push(`.vds-text-end { text-align: end; }`);

  rules.push(`.vds-italic { font-style: italic; }`);
  rules.push(`.vds-not-italic { font-style: normal; }`);

  rules.push(`.vds-underline { text-decoration: underline; }`);
  rules.push(`.vds-line-through { text-decoration: line-through; }`);
  rules.push(`.vds-no-underline { text-decoration: none; }`);

  rules.push(`.vds-uppercase { text-transform: uppercase; }`);
  rules.push(`.vds-lowercase { text-transform: lowercase; }`);
  rules.push(`.vds-capitalize { text-transform: capitalize; }`);
  rules.push(`.vds-normal-case { text-transform: none; }`);

  rules.push(`.vds-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`);
  rules.push(`.vds-whitespace-normal { white-space: normal; }`);
  rules.push(`.vds-whitespace-nowrap { white-space: nowrap; }`);
  rules.push(`.vds-whitespace-pre { white-space: pre; }`);
  rules.push(`.vds-whitespace-pre-wrap { white-space: pre-wrap; }`);
  rules.push(`.vds-break-words { overflow-wrap: break-word; }`);
  rules.push(`.vds-break-all { word-break: break-all; }`);
  rules.push(`.vds-break-keep { word-break: keep-all; }`); // CJK 권장

  // Sub-12px sizes for badge/stat labels (Tailwind 기본 text-xs = 12px 보다 작은 영역).
  // 토큰화하지 않은 직접 값 — 마이크로 인터랙션용 micro-typography.
  rules.push(`.vds-text-2xs { font-size: 0.6875rem; line-height: 1rem; }`);   // 11px
  rules.push(`.vds-text-3xs { font-size: 0.625rem;  line-height: 1rem; }`);   // 10px
  rules.push(`.vds-text-4xs { font-size: 0.5625rem; line-height: 0.875rem; }`); // 9px

  // Tailwind tracking 스케일 보강 (token-driven 외 표준명 widest)
  rules.push(`.vds-tracking-tighter { letter-spacing: -0.05em; }`);
  rules.push(`.vds-tracking-tight { letter-spacing: -0.025em; }`);
  rules.push(`.vds-tracking-normal { letter-spacing: 0; }`);
  rules.push(`.vds-tracking-wide { letter-spacing: 0.025em; }`);
  rules.push(`.vds-tracking-wider { letter-spacing: 0.05em; }`);
  rules.push(`.vds-tracking-widest { letter-spacing: 0.1em; }`);

  // Fill / stroke (icon styling — currentColor inheritance)
  rules.push(`.vds-fill-current { fill: currentColor; }`);
  rules.push(`.vds-fill-none { fill: none; }`);
  rules.push(`.vds-fill-transparent { fill: transparent; }`);
  rules.push(`.vds-stroke-current { stroke: currentColor; }`);
  rules.push(`.vds-stroke-none { stroke: none; }`);
  rules.push(`.vds-stroke-transparent { stroke: transparent; }`);

  // Line-clamp (multi-line truncate)
  for (const n of [1, 2, 3, 4, 5, 6]) {
    rules.push(`.vds-line-clamp-${n} { display: -webkit-box; -webkit-line-clamp: ${n}; -webkit-box-orient: vertical; overflow: hidden; }`);
  }
  rules.push(`.vds-line-clamp-none { -webkit-line-clamp: unset; }`);

  return rules;
}
