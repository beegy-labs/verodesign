const REF = /^\{([^}]+)\}$/;
const LEGACY_REF_ALIASES = new Map([
  ['theme.success', 'theme.status.success'],
  ['theme.success-fg', 'theme.status.success.foreground'],
  ['theme.warning', 'theme.status.warning'],
  ['theme.warning-fg', 'theme.status.warning.foreground'],
  ['theme.error', 'theme.status.error'],
  ['theme.error-fg', 'theme.status.error.foreground'],
  ['theme.info', 'theme.status.info'],
  ['theme.info-fg', 'theme.status.info.foreground'],
  ['theme.neutral', 'theme.status.neutral'],
  ['theme.neutral-fg', 'theme.status.neutral.foreground'],
  ['theme.primary-fg', 'theme.primary.foreground'],
  ['theme.accent-fg', 'theme.accent.foreground'],
  ['theme.destructive-fg', 'theme.destructive.foreground'],
  ['theme.cancelled-fg', 'theme.cancelled.foreground'],
]);

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
  const canonicalRef = LEGACY_REF_ALIASES.get(ref) ?? ref;
  if (seen.has(canonicalRef)) {
    throw new Error(`Reference cycle detected at "${canonicalRef}"`);
  }
  seen.add(canonicalRef);

  const path = canonicalRef.split('.');
  const target = getByPath(tree, path);
  const token = target && typeof target === 'object' && '$root' in target ? target.$root : target;
  if (token == null || !('$value' in token)) {
    throw new Error(`Reference not found: {${canonicalRef}}`);
  }
  return resolveValue(token.$value, tree, seen);
}

export function resolveTokens(flatTokens, tree) {
  return flatTokens.map((token) => ({
    ...token,
    resolvedValue: resolveValue(token.value, tree),
  }));
}
