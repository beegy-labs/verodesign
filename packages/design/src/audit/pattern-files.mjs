import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const PATTERN_DIR = new URL('../patterns/girok/', import.meta.url);
const SHARED_FILE = 'shared.css';
const NON_SHARED_SCOPE_PREFIX = '.vds-pattern-girok-';
const SCOPE_PREFIX_EXCEPTIONS = new Map([
  ['bottomsheet.css', '.vds-pattern-bottomsheet__sheet'],
]);
const FORBIDDEN_TOP_LEVEL_AT_RULES = new Set([
  'layer',
  'import',
  'charset',
  'namespace',
]);

function lineNumberAt(source, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (source[i] === '\n') line += 1;
  }
  return line;
}

function skipTrivia(source, start) {
  let index = start;

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (char === '/' && next === '*') {
      const commentEnd = source.indexOf('*/', index + 2);
      if (commentEnd === -1) {
        throw new Error(`Unterminated comment at line ${lineNumberAt(source, index)}`);
      }
      index = commentEnd + 2;
      continue;
    }

    break;
  }

  return index;
}

function readIdentifier(source, start) {
  let index = start;
  while (index < source.length && /[A-Za-z0-9_-]/.test(source[index])) {
    index += 1;
  }
  return {
    value: source.slice(start, index).toLowerCase(),
    end: index,
  };
}

function consumeBlock(source, openBraceIndex) {
  let depth = 0;
  let index = openBraceIndex;

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (char === '/' && next === '*') {
      const commentEnd = source.indexOf('*/', index + 2);
      if (commentEnd === -1) {
        throw new Error(`Unterminated comment at line ${lineNumberAt(source, index)}`);
      }
      index = commentEnd + 2;
      continue;
    }

    if (char === '"' || char === "'") {
      const quote = char;
      index += 1;
      while (index < source.length) {
        if (source[index] === '\\') {
          index += 2;
          continue;
        }
        if (source[index] === quote) {
          index += 1;
          break;
        }
        index += 1;
      }
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return index + 1;
      if (depth < 0) {
        throw new Error(`Unexpected closing brace at line ${lineNumberAt(source, index)}`);
      }
    }

    index += 1;
  }

  throw new Error(`Unterminated block at line ${lineNumberAt(source, openBraceIndex)}`);
}

function parseTopLevelNodes(source) {
  const nodes = [];
  let index = 0;

  while (index < source.length) {
    index = skipTrivia(source, index);
    if (index >= source.length) break;

    const start = index;
    const line = lineNumberAt(source, start);

    if (source[index] === '@') {
      const ident = readIdentifier(source, index + 1);
      if (!ident.value) throw new Error(`Invalid at-rule at line ${line}`);
      index = ident.end;

      let blockStart = -1;
      let semicolonIndex = -1;
      while (index < source.length) {
        const char = source[index];
        const next = source[index + 1];

        if (char === '/' && next === '*') {
          const commentEnd = source.indexOf('*/', index + 2);
          if (commentEnd === -1) {
            throw new Error(`Unterminated comment at line ${lineNumberAt(source, index)}`);
          }
          index = commentEnd + 2;
          continue;
        }

        if (char === '"' || char === "'") {
          const quote = char;
          index += 1;
          while (index < source.length) {
            if (source[index] === '\\') {
              index += 2;
              continue;
            }
            if (source[index] === quote) {
              index += 1;
              break;
            }
            index += 1;
          }
          continue;
        }

        if (char === '{') {
          blockStart = index;
          break;
        }

        if (char === ';') {
          semicolonIndex = index;
          break;
        }

        index += 1;
      }

      if (blockStart !== -1) {
        const prelude = source.slice(ident.end, blockStart).trim();
        const end = consumeBlock(source, blockStart);
        nodes.push({ type: 'at-rule', name: ident.value, prelude, line });
        index = end;
        continue;
      }

      if (semicolonIndex !== -1) {
        const prelude = source.slice(ident.end, semicolonIndex).trim();
        nodes.push({ type: 'at-rule', name: ident.value, prelude, line });
        index = semicolonIndex + 1;
        continue;
      }

      throw new Error(`Unterminated at-rule at line ${line}`);
    }

    const blockStart = source.indexOf('{', index);
    if (blockStart === -1) throw new Error(`Top-level noise at line ${line}`);

    const selector = source.slice(index, blockStart).trim();
    if (!selector) throw new Error(`Empty selector at line ${line}`);

    index = consumeBlock(source, blockStart);
    nodes.push({ type: 'rule', selector, line });
  }

  return nodes;
}

function expectedScopePrefix(file) {
  return SCOPE_PREFIX_EXCEPTIONS.get(file) ?? NON_SHARED_SCOPE_PREFIX;
}

function validateFile(file, source) {
  const failures = [];
  const nodes = parseTopLevelNodes(source);

  if (nodes.length === 0) {
    failures.push({ file, line: 1, rule: 'empty-file', detail: 'expected at least one top-level rule' });
    return failures;
  }

  const first = nodes[0];
  if (file === SHARED_FILE) {
    if (!(first.type === 'at-rule' && first.name === 'keyframes')) {
      failures.push({ file, line: first.line, rule: 'shared-start', detail: 'shared.css must start with @keyframes' });
    }

    for (const node of nodes) {
      if (node.type === 'at-rule' && FORBIDDEN_TOP_LEVEL_AT_RULES.has(node.name)) {
        failures.push({ file, line: node.line, rule: 'forbidden-outer-at-rule', detail: `top-level @${node.name} is forbidden` });
      }
    }

    return failures;
  }

  const scopeNodes = nodes.filter((node) => node.type === 'at-rule' && node.name === 'scope');
  if (scopeNodes.length !== 1) {
    failures.push({
      file,
      line: scopeNodes[1]?.line ?? first.line,
      rule: 'scope-count',
      detail: `expected exactly 1 top-level @scope block, found ${scopeNodes.length}`,
    });
  }

  if (!(first.type === 'at-rule' && first.name === 'scope')) {
    failures.push({ file, line: first.line, rule: 'scope-start', detail: 'file must start with a top-level @scope block' });
  } else {
    const expectedPrefix = expectedScopePrefix(file);
    if (!first.prelude.startsWith(`(${expectedPrefix}`)) {
      failures.push({ file, line: first.line, rule: 'scope-selector', detail: `@scope must start with (${expectedPrefix}*)` });
    }
  }

  for (const node of nodes) {
    if (node.type === 'at-rule' && node.name !== 'scope') {
      failures.push({
        file,
        line: node.line,
        rule: 'top-level-noise',
        detail: `unexpected top-level @${node.name}; nest it inside @scope or move it to shared.css`,
      });
      continue;
    }

    if (node.type === 'rule') {
      failures.push({
        file,
        line: node.line,
        rule: 'top-level-noise',
        detail: `unexpected top-level selector "${node.selector}" outside @scope`,
      });
    }
  }

  return failures;
}

export async function auditPatternFiles() {
  const entries = (await readdir(PATTERN_DIR)).filter((entry) => entry.endsWith('.css')).sort();
  const failures = [];

  for (const file of entries) {
    const filePath = path.join(PATTERN_DIR.pathname, file);
    const source = await readFile(filePath, 'utf8');

    try {
      failures.push(...validateFile(file, source));
    } catch (error) {
      failures.push({
        file,
        line: 1,
        rule: 'parse-error',
        detail: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { entries, failures };
}
