import { buildThemeTokens, flattenTokens } from '../build/loader.mjs';
import { getImplementedTokenPaths } from '../build/slot-groups.mjs';

export async function auditParity(themes) {
  const isCanonicalSlot = (token) => token.path[0] !== 'exp';
  const failures = [];

  for (const theme of themes) {
    for (const mode of ['light', 'dark']) {
      const expected = await getImplementedTokenPaths(theme, mode);
      const tree = await buildThemeTokens(theme, mode);
      const actual = new Set(
        flattenTokens(tree)
          .filter(isCanonicalSlot)
          .map((token) => token.path.join('.'))
          .filter((tokenPath) => expected.has(tokenPath))
      );
      const missing = [...expected].filter((tokenPath) => !actual.has(tokenPath));
      if (missing.length) {
        failures.push({ theme: `${theme}/${mode}`, missing, extra: [] });
      }
    }
  }
  return { failures };
}
