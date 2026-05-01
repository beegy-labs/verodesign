import { buildThemeTokens, flattenTokens } from '../build/loader.mjs';

export async function auditParity(themes) {
  const sets = {};
  for (const theme of themes) {
    const tree = await buildThemeTokens(theme, 'light');
    const flat = flattenTokens(tree);
    sets[theme] = new Set(flat.map((t) => t.path.join('.')));
  }

  const baseline = sets[themes[0]];
  const failures = [];
  for (const theme of themes.slice(1)) {
    const missing = [...baseline].filter((p) => !sets[theme].has(p));
    const extra = [...sets[theme]].filter((p) => !baseline.has(p));
    if (missing.length || extra.length) {
      failures.push({ theme, missing, extra });
    }
  }
  return { failures };
}
