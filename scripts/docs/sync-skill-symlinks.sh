#!/usr/bin/env bash
# sync-skill-symlinks.sh
#
# Re-derive per-tool skill symlinks from the canonical `.agents/skills/`.
# Idempotent. Run after adding/removing a skill in `.agents/skills/`.
#
# Usage:
#   scripts/docs/sync-skill-symlinks.sh            # mutates: re-creates symlinks
#   scripts/docs/sync-skill-symlinks.sh --check    # read-only: fails if any link is missing or wrong
#
# Canonical:  .agents/skills/<name>/SKILL.md
# Per-tool:   .{claude,gemini,codex,cursor}/skills/<name>  -> ../../.agents/skills/<name>
#
# Wired into lefthook.yml pre-commit (--check mode).
# Policy: docs/llm/policies/tool-portability.md, anti-drift-checklist.md.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

CHECK_ONLY=0
[ "${1:-}" = "--check" ] && CHECK_ONLY=1

if [ ! -d .agents/skills ]; then
  echo "FAIL: .agents/skills/ does not exist."
  exit 1
fi

fail=0
for tool in claude gemini codex cursor; do
  dir=".${tool}/skills"
  mkdir -p "$dir"
  count=0
  for skill_dir in .agents/skills/*/; do
    name=$(basename "$skill_dir")
    target="$dir/$name"
    expected="../../.agents/skills/$name"
    if [ -L "$target" ] && [ "$(readlink "$target")" = "$expected" ]; then
      count=$((count + 1))
      continue
    fi
    if [ "$CHECK_ONLY" -eq 1 ]; then
      echo "FAIL: $target missing or wrong target (expected $expected)"
      fail=1
      continue
    fi
    rm -rf "$target"
    ln -s "$expected" "$target"
    count=$((count + 1))
  done
  echo "$tool: $count symlinks"
done

if [ "$CHECK_ONLY" -eq 1 ] && [ "$fail" -ne 0 ]; then
  echo "Re-run 'scripts/docs/sync-skill-symlinks.sh' to fix."
  exit 1
fi
