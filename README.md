# gatekeepers

GatekeeperOS is an independent project. It is not affiliated with or endorsed by the OpenClaw Foundation. OpenClaw is a trademark of its owner.

Community gatekeepers for [GatekeeperOS](https://github.com/gatekeeper-os/gatekeeper-os): one folder per external service, each an OpenClaw plugin built on `@gatekeeper-os/gatekeeper-kit`.

**capability-based access and deferred approvals for OpenClaw**

A gatekeeper is the driver through which an agent reaches one service. It holds the credentials (the agent never sees them), exposes a small set of capability-oriented tools that take a grant handle, logs every read, queues every write for human approval, and simulates the write locally so the agent keeps working in the meantime.

All four reference drivers — **fs**, **github**, **mcp**, and **http** — live in the [core repository](https://github.com/gatekeeper-os/gatekeeper-os), at `packages/gkos-gatekeeper-fs`, `packages/gkos-gatekeeper-github`, `packages/gkos-gatekeeper-mcp`, and `packages/gatekeeper-http`. This is a location rule, not a claim that every driver is release-ready; check each driver’s current plan and evidence in core. Community service drivers live here, one folder per vendor.

**Tier 1: published beta.5 registry builds.** Imports resolve directly to
`@gatekeeper-os/gatekeeper-kit@0.1.0-beta.5` and
`@gatekeeper-os/shared@0.1.0-beta.5`, with registry-generated integrity locks.
No previous-scope aliases, core source links or local tarballs are used. Exact
installed identities are verified. See [the migration note](MIGRATION.md).
The starter is an inert template, not a runnable service. Tool-surface
PRs remain welcome and the two reviews are still required.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm test
pnpm check:secrets
```

CI always checks the reviewed pinned write-gatekeeper snapshot, probes public
core without credentials, then fetches core `main` and compares the complete skill
tree. Both checks are mandatory. HTTP404 (missing/private core), other HTTP or
transport errors, clone failures and parity mismatches all fail the job; there is
no private-core skip path or conditional live-fetch step. No core-read token is used.

### Public live-sync evidence

[Run35156945324, attempt2](https://github.com/gatekeeper-os/gatekeepers/actions/runs/35156945324/attempts/2)
passed after the repositories became public. **Live core-main fetch and parity**
actually ran and passed against core975c547, rather than being skipped. The
private-core exception was removed only after that evidence. Pinned snapshot
parity remains a separate check, never a substitute for the mandatory live fetch.

## Gatekeepers

| Service | Folder | Status | Observer strategy |
|---|---|---|---|
| _(none yet — see the wanted list)_ | | | |

Status: **draft** (tool surface under review) → **alpha** (works, conformance passes) → **stable** (used in anger, simulation and revert covered).

## Wanted

See the [gatekeeper-wanted issues](https://github.com/gatekeeper-os/gatekeepers/issues?q=is%3Aissue+is%3Aopen+label%3Agatekeeper-wanted). Comment on one to claim it, or open a new one for a service that isn't listed.

## Building one

Follow [`.agents/skills/write-gatekeeper/SKILL.md`](.agents/skills/write-gatekeeper/SKILL.md). It is written so that a coding agent can execute it, and it has two **STOP** points: tool-surface review before implementation, then approval before responsibilities 4–7. Copy the real files in [`template/`](template/) after tool-surface review. The skill is an exact copy of core’s; its `docs/`, `packages/`, `config/`, and harness paths refer to a core checkout. The prose skeleton is [core’s `packages/gatekeeper-kit/SKELETON.md`](https://github.com/gatekeeper-os/gatekeeper-os/blob/main/packages/gatekeeper-kit/SKELETON.md), not a second local skill file.

The one rule that is never negotiable: **every outside-world interaction goes through `authorizeObservation()` or `submitAction()`.** Use core’s supported `pnpm conformance --only deferred-approval,require-approval-roundtrip` command plus kit tests, the secret-leak gate, and the VM harness for live acceptance. There is no `--gatekeeper` CLI selector. Type-checking the starter is not driver conformance or live evidence.

## License

MIT. The gatekeeper model is adapted from [Cloudflare OS](https://github.com/cloudflare/cloudflare-os); see `NOTICE`.
