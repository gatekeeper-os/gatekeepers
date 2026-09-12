# Contributing a gatekeeper

Read the org-wide [CONTRIBUTING](https://github.com/clawkeeper/.github/blob/main/CONTRIBUTING.md) first. This file is the part specific to drivers.

**Tool-surface PRs welcome; registry builds are available.** Use the exact published
`@clawkeepers/gatekeeper-kit@0.1.0-beta.1` and `@clawkeepers/shared@0.1.0-beta.1`
dependencies. Do not vendor the kit or replace registry dependencies with local
workspace links. The starter remains draft, not an accepted service.

## The procedure

This is the `write-gatekeeper` skill, condensed. The full version in `.agents/skills/write-gatekeeper/SKILL.md` is what your agent should follow. It is copied byte-for-byte from core; its `docs/`, `packages/`, `config/`, and harness paths refer to the core checkout. New community package names use the `@clawkeepers` scope.

**Phase 1 — auth, API, granting**

1. Understand the service: its auth model, which resource granularities are *meaningful* (a repo, an issue — not a single field), which operations are reads vs. writes, which writes are reversible.
2. Design the tool surface in `src/tools.ts`: one small group of tools per resource type, every tool takes `grant`, structured inputs and outputs, simplified for the common case. Decide which URL patterns `getGatekeeperFor()` matches.
3. **STOP.** Open a draft PR containing only `README.md`, `src/tools.ts`, and `src/resources.ts` and ask for review. The tool surface is the part that is expensive to change later; we review it before anything else is written.
4. After STOP 1 approval, copy [`template/`](template/) to `<vendor>/` and implement against [core’s skeleton](https://github.com/clawkeeper/openclaw-os/blob/main/packages/gatekeeper-kit/SKELETON.md): vendor, account store, per-resource `KitGatekeeper`, and session. The kernel OAuth router owns the two-stage nonce; vendors preserve its state and perform provider/PKCE checks, not a parallel nonce store.
5. Register: `openclaw.plugin.json` with the `clawos.gatekeeper` marker; `package.json` with `openclaw.compat`; add a row to the catalog.
6. **STOP.** Ask whether to proceed to Phase 2.

**Phase 2 — approvals, caching, simulation, observers**

7. Wrap *every* outside-world interaction in `authorizeObservation()` / `submitAction()`.
8. Caching, then simulation (overlay-at-read is the kit default; mutate-the-cache is available), then the observer strategy for each resource type.
9. Run core’s `pnpm conformance --only deferred-approval,require-approval-roundtrip` and the kit harness tests, then the secret-leak gate. Live acceptance runs via core’s `scripts/vm/test.sh` as documented in `docs/vm-testing.md`; a local type-check is not acceptance. The CLI has no `--gatekeeper` selector.

## Folder layout

```
gatekeepers/<vendor>/
├── openclaw.plugin.json     # id gatekeeper-<vendor>, empty contracts.tools, clawos.gatekeeper marker
├── package.json             # @clawkeepers/gatekeeper-<vendor>, openclaw.compat, peer on openclaw
├── src/
│   ├── index.ts             # export default defineGatekeeper({...})
│   ├── vendor.ts            # describe, connectAccount, resources
│   ├── account.ts           # token store, refresh, getGatekeeperFor
│   ├── <resource>.ts        # one Gatekeeper impl per resource type
│   ├── tools.ts             # GatekeeperToolDef[] (TypeBox)
│   ├── resources.ts         # SupportedResource[] with explicit observer strategy
│   ├── simulate.ts          # overlay rules per action kind
│   └── api.ts               # thin wrapper over the vendor HTTP API
├── deploy-inputs.json       # which secrets, console URL, redirect URI template
├── README.md                # what it grants, tool list, observer strategy, known limits
└── test/
```

The starter is private and fail-closed: no credentials, network adapter, account connection, successful observation, or action application. Rename `example` and replace its disabled stubs only after the required reviews. Match compatibility ranges to core’s catalog at implementation time; do not mechanically rename protocol keys such as `clawos.gatekeeper`.

## Things reviewers will check

- Tool descriptions never mention approvals, queues, caching, OAuth, or simulation. The abstraction is invisible to the agent.
- No tool is registered by the gatekeeper itself. The kernel registers them.
- Errors returned to the agent are sanitized (no URLs, tokens, vendor bodies) — use `sanitizeError()` from the kit.
- The observer strategy is justified in the README (A private-only, B ACL check, C dataset tracking, D low-stakes) using the rule from the docs: C only when the binding spans sub-resources with distinct ACLs *and* there's a per-observer oracle.
- A resource never becomes ambient by the gatekeeper's own doing.

Tier 1 CI fetches core main and compares the complete skill tree. It fails when
core is unreadable or the tree differs; there is no pinned-snapshot substitute.
A dedicated read-only core credential is required while the source is private.
Never expose it to contributor code or persist checkout credentials. Copy the
complete reviewed skill from current core when updating it. Registry-backed
build/typecheck/declaration tests do not establish live driver acceptance.
