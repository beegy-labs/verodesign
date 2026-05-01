const REF = /^\{([^}]+)\}$/;

function getByPath(tree, path) {
  let node = tree;
  for (const seg of path) {
    if (node == null || typeof node !== 'object') return undefined;
    node = node[seg];
  }
  return node;
}

export function resolveValue(rawValue, tree, seen = new Set()) {
  if (typeof rawValue !== 'string') return rawValue;
  const match = rawValue.match(REF);
  if (!match) return rawValue;

  const ref = match[1];
  if (seen.has(ref)) {
    throw new Error(`Reference cycle detected at "${ref}"`);
  }
  seen.add(ref);

  const path = ref.split('.');
  const target = getByPath(tree, path);
  if (target == null || !('$value' in target)) {
    throw new Error(`Reference not found: {${ref}}`);
  }
  return resolveValue(target.$value, tree, seen);
}

export function resolveTokens(flatTokens, tree) {
  return flatTokens.map((token) => ({
    ...token,
    resolvedValue: resolveValue(token.value, tree),
  }));
}
