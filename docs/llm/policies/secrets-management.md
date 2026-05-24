# Secrets Management Policy

> SSOT for where credentials live, how they reach the cluster, and what the operator's local working copy looks like. **Last reviewed**: 2026-05-24.

## Canonical stores (the only places that hold authoritative secret material)

| Store | Layer | Scope | Decrypt requires |
|---|---|---|---|
| OpenBao (`bootstrap-openbao.beegy.net`) | L1 | All cluster runtime + L2 workload secrets | Vault token (root or scoped policy) |
| ansible-vault (`metal/ansible/group_vars/all/vault.yml`) | L0 | Host-level secrets (TLS cert/key for Headscale, kubeadm secrets, BMC creds, …) | Operator-known vault password |
| Bootstrap-time `.env` (`bootstrap/terraform/.env`) | L1 bootstrap | One-shot seeds for Terraform: Cloudflare API token, B2 access keys, OpenBao initial token | Operator personal file (gitignored) |
| Operator SSH key (`~/.ssh/`) | L0 / operator | git access, ansible SSH, kubectl context auth (if cert-based) | Operator login / hardware key |
| Operator GitHub PAT / gh keyring | external | gh CLI auth, ArgoCD repo (if HTTPS) | macOS keychain / gh |

NO secret material is committed to git in plaintext. Encrypted forms (ansible-vault, SOPS, sealed-secret) are acceptable; plaintext is never acceptable.

## Local working copy — `.secrets/`

The repo allows ONE local-only secrets inbox: `.secrets/` at repo root. This is the operator's fast-access copy for development.

- `.gitignore` blocks `.secrets/` and `.secrets/**` (verified — git refuses to stage anything under it).
- `.secrets/README.md` enumerates the conventional filenames.
- The directory is the operator's personal store, NOT a deployment artifact. Cluster does not read from it.

When a secret rotates: update OpenBao / ansible-vault (canonical), then mirror the new value into `.secrets/` so the operator's working copy stays fresh.

## Flow: how a secret reaches an L2 workload

```
Operator generates credential (or external service issues it)
        │
        ▼
Store in canonical: OpenBao  (or ansible-vault for L0)
        │
        │ also mirror to .secrets/<file>.txt (operator working copy, optional)
        ▼
ExternalSecret CR references OpenBao path → ClusterSecretStore vault-backend
        │ (server: https://bootstrap-openbao.beegy.net per v1.0.7)
        ▼
ESO operator fetches → creates k8s Secret → mounted by workload pod
```

## Rules (enforce in PR review + check-script)

1. **No plaintext secrets in tracked files.** Search trips: `grep -rIE '(password|token|secret|api_key|access_key)\s*[:=]\s*[\"\x27][^\"\x27]{12,}'` over staged files.
2. **No reference to `.secrets/` paths from tracked files.** Helm values / TF tfvars / docs must NOT name files under `.secrets/`. (.gitignore already blocks the directory; this catches accidental string references.)
3. **No raw `kubectl create secret`** — always go through ExternalSecret + OpenBao or sealed-secret.
4. **No commit messages that paste a secret.** Even after the file is removed, git history retains it.
5. **No Slack / chat / PR comment paste.** Use OpenBao path reference instead (e.g., `secret/cloudflare/api-token`).
6. **Rotation propagates to all consumers.** When a credential rotates, update OpenBao first, then the local `.secrets/` mirror; ESO reconciles automatically on its next pass.
7. **The bootstrap `.env`** (`bootstrap/terraform/.env`) is gitignored but lives outside `.secrets/` because Terraform reads it directly. Keep its contents synced with the corresponding `.secrets/` files when both exist.

## Inventory of credential classes (scope guide)

| Credential class | Canonical | `.secrets/<file>` | Used by |
|---|---|---|---|
| Cloudflare API token | OpenBao `secret/cloudflare/api-token` | `cloudflare-api-token.txt` | L2 cloudflare-ddns + cloudflare-tunnel, future L0/L1 cloudflare-dns module |
| OpenBao root token | bootstrap output | `openbao-root-token.txt` | Operator bao CLI |
| OpenBao Shamir unseal keys | DR break-glass | `openbao-unseal-keys.txt` | DR-only |
| bootstrap-gitea admin | OpenBao `secret/gitea/admin` | `gitea-admin-credentials.txt` | Operator UI, gh CLI Gitea repo |
| L2 gitea-runtime admin | OpenBao `secret/gitea-runtime/admin` | `gitea-runtime-credentials.txt` | Operator UI |
| Headscale pre-auth key | OpenBao `secret/headscale/preauth-key` | `headscale-preauth-key.txt` | Operator + node enrollment |
| Headscale TLS cert/key | ansible-vault | (not in .secrets/) | L0 headscale-tls role |
| GitHub PAT | gh keyring / external | `github-pat.txt` | gh CLI, ArgoCD if HTTPS GitHub source, Gitea pull-mirror |
| Ansible vault password | operator memory | `ansible-vault-password.txt` | `ansible-vault edit` |
| B2 backup keys | OpenBao `secret/dr/b2-credentials` | `b2-credentials.txt` | etcd-backup, vault-backup |
| bootstrap-argocd admin | OpenBao `secret/argocd/admin` | `argocd-admin-credentials.txt` | Operator UI |

## Anti-patterns

- ❌ Paste a secret into a PR description / Slack / GitHub Issue
- ❌ `git add -f .secrets/foo.txt` (force-bypass the gitignore — never)
- ❌ Hard-code a token in `clusters/home/values/<component>-values.yaml`
- ❌ Use a real secret as a "test fixture" in `.specs/` or `docs/`
- ❌ Refer to a `.secrets/<file>.txt` path from tracked code/values/docs (the path itself signals existence; encode references as OpenBao paths instead)
- ❌ Skip OpenBao because "the value is short-lived" — short-lived secrets still need a canonical store for rotation tracking
- ❌ Rotate a secret in OpenBao without updating the `.secrets/` mirror (operator's working copy goes stale → next dev session re-generates a duplicate)

## Verification

- `git check-ignore .secrets/` → matches `.gitignore:149 .secrets/`
- `git ls-files .secrets/` → empty
- `grep -rE '(password|token|secret).*=.*[A-Za-z0-9_-]{20,}' <staged files>` → reject if any match in a TRACKED file
- `scripts/docs/check-agent-portability.sh` extended to refuse `git add` of any `.secrets/` path

## Related

- [tier-isolation.md](tier-isolation.md) — OpenBao = L1 (`bootstrap-openbao.beegy.net`)
- [cdd.md § Core Values](cdd.md) — secrets policy is one of the hard rules
- [response-style-policy.md](response-style-policy.md) — secrets never appear in responses
- `.secrets/README.md` — local file conventions (not committed)
