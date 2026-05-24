#!/usr/bin/env bash
# check-agent-portability.sh
#
# Anti-drift verification for the AGENTS.md / CLAUDE.md / CODEX.md / GEMINI.md
# tool-variant sync, plus .agents/skills/ hygiene (agentskills.io spec).
#
# Wired into lefthook.yml pre-commit. Currently runnable manually:
#   ./scripts/docs/check-agent-portability.sh
#
# Exits non-zero on any drift.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

fail=0

# ────────────────────────────────────────────────────────────────
# 1. AGENTS.md size + neutrality
# ────────────────────────────────────────────────────────────────

agents_lines=$(wc -l < AGENTS.md)
if [ "$agents_lines" -gt 150 ]; then
  echo "FAIL: AGENTS.md is ${agents_lines} lines (>150). Trim or push detail to docs/llm/."
  fail=1
fi

# Tool-specific keywords MUST NOT appear in AGENTS.md body.
# (The grep pattern lives here, not in AGENTS.md, to avoid self-match.)
# Note: bare "Skill" / "Skills" is the agentskills.io open-standard term and is NOT
# tool-specific. We only flag vendor names + their proprietary primitives.
if grep -nE "(Claude Code|Codex CLI|MCP|TaskCreate|/loop|/ultrareview|Anthropic|OpenAI Codex|Gemini CLI|Cursor IDE|claude-code-)" AGENTS.md; then
  echo "FAIL: AGENTS.md contains tool-specific keyword(s). Move to per-tool addendum."
  fail=1
fi

# ────────────────────────────────────────────────────────────────
# 2. Tool variants body == AGENTS.md body
# ────────────────────────────────────────────────────────────────

agents_body=$(awk '/^## Project/{p=1} p' AGENTS.md)

check_variant() {
  local variant_file="$1"
  if [ ! -f "$variant_file" ]; then
    return
  fi
  local variant_body
  variant_body=$(awk '/<!-- BEGIN AGENTS.md body/{p=1; next} /<!-- END AGENTS.md body/{p=0} p' "$variant_file" \
    | awk '/^## Project/{p=1} p')
  if [ "$agents_body" != "$variant_body" ]; then
    echo "FAIL: $variant_file body differs from AGENTS.md body."
    diff <(echo "$agents_body") <(echo "$variant_body") | head -20
    fail=1
  fi
}

check_variant CLAUDE.md
check_variant CODEX.md
check_variant GEMINI.md

# ────────────────────────────────────────────────────────────────
# 3. .agents/skills/ hygiene (canonical Tier-1p)
# ────────────────────────────────────────────────────────────────

if [ ! -d .agents/skills ]; then
  echo "FAIL: .agents/skills/ directory missing."
  fail=1
fi

# Every .agents/skills/<name>/SKILL.md must start with YAML frontmatter.
for f in .agents/skills/*/SKILL.md; do
  [ -f "$f" ] || continue
  if ! head -1 "$f" | grep -q '^---$'; then
    echo "FAIL: $f missing YAML frontmatter."
    fail=1
  fi
done

# Every SKILL.md must have name, description, when, tags fields.
for f in .agents/skills/*/SKILL.md; do
  [ -f "$f" ] || continue
  for key in name description when tags; do
    if ! grep -q "^${key}:" "$f"; then
      echo "FAIL: $f missing '${key}:' frontmatter field (agentskills.io spec)."
      fail=1
    fi
  done
done

# name must match directory name.
for f in .agents/skills/*/SKILL.md; do
  [ -f "$f" ] || continue
  dir=$(basename "$(dirname "$f")")
  name=$(awk '/^name:/ { print $2; exit }' "$f")
  if [ "$name" != "$dir" ]; then
    echo "FAIL: $f has 'name: $name' but lives in directory '$dir'. Must match."
    fail=1
  fi
done

# Every SKILL.md must be indexed in .agents/skills/README.md.
for f in .agents/skills/*/SKILL.md; do
  [ -f "$f" ] || continue
  name=$(basename "$(dirname "$f")")
  if ! grep -q "$name" .agents/skills/README.md; then
    echo "FAIL: skill '$name' not referenced in .agents/skills/README.md."
    fail=1
  fi
done

# SKILL.md size: WARN at >200, FAIL at >500.
for f in .agents/skills/*/SKILL.md; do
  [ -f "$f" ] || continue
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 500 ]; then
    echo "FAIL: $f is ${lines} lines (>500 hard cap). Split or move reasoning to docs/llm/."
    fail=1
  elif [ "$lines" -gt 200 ]; then
    echo "WARN: $f is ${lines} lines (>200 soft target). Consider splitting."
  fi
done

# ────────────────────────────────────────────────────────────────
# 4. Per-tool symlink consistency
# ────────────────────────────────────────────────────────────────

if [ -x scripts/docs/sync-skill-symlinks.sh ]; then
  if ! scripts/docs/sync-skill-symlinks.sh --check >/dev/null 2>&1; then
    echo "FAIL: per-tool skill symlinks out of sync with .agents/skills/. Run: scripts/docs/sync-skill-symlinks.sh"
    fail=1
  fi
fi

# ────────────────────────────────────────────────────────────────
# 5. .ai/ size limit (≤ 50 lines/file)
# ────────────────────────────────────────────────────────────────

for f in .ai/*.md; do
  [ -f "$f" ] || continue
  lines=$(wc -l < "$f")
  if [ "$lines" -gt 50 ] && [ "$(basename "$f")" != "CHANGELOG.md" ]; then
    echo "WARN: $f is ${lines} lines (>50). Consider splitting (Tier-1 should be pure pointers)."
  fi
done

# ────────────────────────────────────────────────────────────────
# 6.5. .secrets/ must NEVER be tracked
# ────────────────────────────────────────────────────────────────

tracked_secrets=$(git ls-files '.secrets/' 2>/dev/null | head -5)
if [ -n "$tracked_secrets" ]; then
  echo "FAIL: .secrets/ has tracked files (must be gitignored):"
  echo "$tracked_secrets"
  fail=1
fi

# ────────────────────────────────────────────────────────────────
# 6. No dangling symlinks
# ────────────────────────────────────────────────────────────────

dangling=$(find . -type l -not -path './.git/*' -not -path './.claude/worktrees/*' -not -path './node_modules/*' \
  ! -exec test -e {} \; -print 2>/dev/null | head -10)
if [ -n "$dangling" ]; then
  echo "FAIL: dangling symlinks present:"
  echo "$dangling"
  fail=1
fi

# ────────────────────────────────────────────────────────────────
# 7. AGENTS.md references the organization-wide SSOTs
#
# Consumer-repo variant: references only the 11 organization-wide policy
# files that platform-gitops distributes. platform-gitops-specific SSOTs
# (image-source-policy, workload-placement, deployment-flow,
# host-netns-precondition, tier-isolation) live only in the Tier-0 SSOT.
# ────────────────────────────────────────────────────────────────

for ssot in \
  "docs/llm/policies/cdd.md" \
  "docs/llm/policies/sdd.md" \
  "docs/llm/policies/add.md" \
  "docs/llm/policies/tool-portability.md" \
  "docs/llm/policies/response-style-policy.md" \
  "docs/llm/policies/documentation-tiers.md" \
  "docs/llm/policies/token-optimization.md" \
  "docs/llm/policies/anti-drift-checklist.md" \
  "docs/llm/policies/secrets-management.md" \
  "docs/llm/policies/organization-standard.md" \
  "docs/llm/policies/distribution.md"
do
  if ! grep -q "$ssot" AGENTS.md; then
    echo "FAIL: AGENTS.md missing reference to $ssot"
    fail=1
  fi
done

# ────────────────────────────────────────────────────────────────
# 8. Core Values explicit in AGENTS.md
# ────────────────────────────────────────────────────────────────

if ! grep -q "^## Core Values" AGENTS.md; then
  echo "FAIL: AGENTS.md missing '## Core Values' section."
  fail=1
fi
if ! grep -q "Token optimization" AGENTS.md; then
  echo "FAIL: AGENTS.md missing 'Token optimization' Core Value."
  fail=1
fi
if ! grep -q "LLM-tool-neutrality" AGENTS.md; then
  echo "FAIL: AGENTS.md missing 'LLM-tool-neutrality' Core Value."
  fail=1
fi
if ! grep -q "Fail-Fast" AGENTS.md; then
  echo "FAIL: AGENTS.md missing 'Fail-Fast' Core Value."
  fail=1
fi

# ────────────────────────────────────────────────────────────────
# Result
# ────────────────────────────────────────────────────────────────

if [ "$fail" -eq 0 ]; then
  echo "OK: agent portability + .agents/skills hygiene checks passed."
fi
exit "$fail"
