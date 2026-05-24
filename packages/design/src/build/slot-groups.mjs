import { loadSemantic, flattenTokens, loadTheme } from './loader.mjs';

let semanticGroupsCache;

function getSlotGroup(definition) {
  return definition?.json?.$extensions?.verobee?.slotGroup;
}

export async function loadSemanticGroups() {
  if (semanticGroupsCache) return semanticGroupsCache;

  const semantic = await loadSemantic();
  const groups = new Map();

  for (const definition of semantic) {
    const group = getSlotGroup(definition);
    if (!group) continue;
    groups.set(group, {
      file: definition.name,
      paths: new Set(flattenTokens(definition.json).map((token) => token.path.join('.'))),
    });
  }

  semanticGroupsCache = groups;
  return groups;
}

export async function getThemeImplements(theme, mode = 'light') {
  const themeJson = await loadTheme(theme, mode);
  const implementsList = themeJson?.$extensions?.verobee?.implements;
  return Array.isArray(implementsList) ? implementsList : ['core', 'web'];
}

export async function getImplementedTokenPaths(theme, mode = 'light') {
  const groups = await loadSemanticGroups();
  const implementsList = await getThemeImplements(theme, mode);
  const paths = new Set();

  for (const group of implementsList) {
    const entry = groups.get(group);
    if (!entry) continue;
    for (const tokenPath of entry.paths) paths.add(tokenPath);
  }

  return paths;
}

export async function isImplementedToken(theme, mode, tokenPath) {
  const paths = await getImplementedTokenPaths(theme, mode);
  return paths.has(tokenPath);
}
