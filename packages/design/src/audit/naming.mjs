import { loadPrimitives, loadSemantic, flattenTokens, deepMerge } from '../build/loader.mjs';
import { tokenPathToCssVar } from '../build/css-vars.mjs';

const PATTERN = /^--vds-[a-z0-9][a-z0-9_]*(-[a-z0-9][a-z0-9_]*)*$/;

export async function auditNaming() {
  const primitives = await loadPrimitives();
  const semantic = await loadSemantic();
  let tree = {};
  for (const { json } of primitives) tree = deepMerge(tree, json);
  for (const { json } of semantic) tree = deepMerge(tree, json);

  const flat = flattenTokens(tree);
  const failures = [];
  for (const t of flat) {
    const v = tokenPathToCssVar(t.path);
    if (!PATTERN.test(v)) {
      failures.push({ token: t.path.join('.'), cssVar: v });
    }
  }
  return { failures };
}
