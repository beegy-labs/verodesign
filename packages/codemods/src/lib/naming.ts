export type TransformOptions = {
  dry?: boolean;
};

export const CSS_VAR_RENAMES: Array<[string, string]> = [
  ['--vds-theme-success-fg', '--vds-theme-status-success-foreground'],
  ['--vds-theme-warning-fg', '--vds-theme-status-warning-foreground'],
  ['--vds-theme-error-fg', '--vds-theme-status-error-foreground'],
  ['--vds-theme-info-fg', '--vds-theme-status-info-foreground'],
  ['--vds-theme-neutral-fg', '--vds-theme-status-neutral-foreground'],
  ['--vds-theme-primary-fg', '--vds-theme-primary-foreground'],
  ['--vds-theme-accent-fg', '--vds-theme-accent-foreground'],
  ['--vds-theme-accent-2-fg', '--vds-theme-accent-2-foreground'],
  ['--vds-theme-accent-3-fg', '--vds-theme-accent-3-foreground'],
  ['--vds-theme-destructive-fg', '--vds-theme-destructive-foreground'],
  ['--vds-theme-cancelled-fg', '--vds-theme-cancelled-foreground'],
  ['--vds-theme-success', '--vds-theme-status-success'],
  ['--vds-theme-warning', '--vds-theme-status-warning'],
  ['--vds-theme-error', '--vds-theme-status-error'],
  ['--vds-theme-info', '--vds-theme-status-info'],
  ['--vds-theme-neutral', '--vds-theme-status-neutral'],
];

export const TOKEN_REF_RENAMES: Array<[string, string]> = [
  ['theme.success-fg', 'theme.status.success.foreground'],
  ['theme.warning-fg', 'theme.status.warning.foreground'],
  ['theme.error-fg', 'theme.status.error.foreground'],
  ['theme.info-fg', 'theme.status.info.foreground'],
  ['theme.neutral-fg', 'theme.status.neutral.foreground'],
  ['theme.primary-fg', 'theme.primary.foreground'],
  ['theme.accent-fg', 'theme.accent.foreground'],
  ['theme.accent-2-fg', 'theme.accent-2.foreground'],
  ['theme.accent-3-fg', 'theme.accent-3.foreground'],
  ['theme.destructive-fg', 'theme.destructive.foreground'],
  ['theme.cancelled-fg', 'theme.cancelled.foreground'],
  ['theme.success', 'theme.status.success'],
  ['theme.warning', 'theme.status.warning'],
  ['theme.error', 'theme.status.error'],
  ['theme.info', 'theme.status.info'],
  ['theme.neutral', 'theme.status.neutral'],
];

type JsonToken = Record<string, unknown>;
type JsonNode = Record<string, unknown>;

const STATUS_KEYS = ['success', 'warning', 'error', 'info', 'neutral'] as const;
const WRAPPED_KEYS = ['primary', 'accent', 'accent-2', 'accent-3', 'destructive', 'cancelled'] as const;

function isObject(value: unknown): value is JsonNode {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function isLeafToken(value: unknown): value is JsonToken {
  return isObject(value) && ('$value' in value || '$type' in value || '$description' in value);
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function wrapRoot(value: unknown): JsonNode {
  if (!isObject(value)) return {};
  if ('$root' in value) return clone(value);
  if (isLeafToken(value)) return { $root: clone(value) };
  return clone(value);
}

function moveStatusDomain(theme: JsonNode) {
  const status = isObject(theme.status) ? clone(theme.status) : {};
  let changed = false;

  for (const key of STATUS_KEYS) {
    const rootValue = theme[key];
    const fgValue = theme[`${key}-fg`];
    if (!rootValue && !fgValue) continue;

    const current = isObject(status[key]) ? clone(status[key]) : {};
    if (rootValue) {
      current.$root = isObject(rootValue) ? clone(rootValue) : rootValue;
      delete theme[key];
      changed = true;
    }
    if (fgValue) {
      current.foreground = isObject(fgValue) ? clone(fgValue) : fgValue;
      delete theme[`${key}-fg`];
      changed = true;
    }
    status[key] = current;
  }

  if (changed) theme.status = status;
}

function moveWrappedForegrounds(theme: JsonNode) {
  for (const key of WRAPPED_KEYS) {
    const fgKey = `${key}-fg`;
    const rootValue = theme[key];
    const fgValue = theme[fgKey];
    if (!rootValue && !fgValue) continue;

    const wrapped = rootValue ? wrapRoot(rootValue) : {};
    if (fgValue) {
      wrapped.foreground = isObject(fgValue) ? clone(fgValue) : fgValue;
      delete theme[fgKey];
    }
    theme[key] = wrapped;
  }

  if (theme['primary-ring']) {
    const wrapped = wrapRoot(theme.primary);
    wrapped.ring = clone(theme['primary-ring']);
    theme.primary = wrapped;
    delete theme['primary-ring'];
  }
}

function rewriteRefs(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(rewriteRefs);
  if (!isObject(node)) return node;

  const out: JsonNode = {};
  for (const [key, value] of Object.entries(node)) {
    const nextValue = rewriteRefs(value);
    if (key === '$value' && typeof nextValue === 'string') {
      let rewritten = nextValue;
      for (const [from, to] of TOKEN_REF_RENAMES) {
        rewritten = rewritten.replaceAll(`{${from}}`, `{${to}}`);
      }
      out[key] = rewritten;
    } else {
      out[key] = nextValue;
    }
  }
  return out;
}

export function migrateTokenJson(source: string): string {
  const json = JSON.parse(source) as JsonNode;
  const theme = isObject(json.theme) ? clone(json.theme) : undefined;
  if (theme) {
    moveStatusDomain(theme);
    moveWrappedForegrounds(theme);
    json.theme = rewriteRefs(theme);
  } else {
    return JSON.stringify(rewriteRefs(json), null, 2) + '\n';
  }
  return JSON.stringify(rewriteRefs(json), null, 2) + '\n';
}

export function migrateText(source: string): string {
  let out = source;
  for (const [from, to] of CSS_VAR_RENAMES) out = out.replaceAll(from, to);
  for (const [from, to] of TOKEN_REF_RENAMES) out = out.replaceAll(from, to);
  return out;
}
