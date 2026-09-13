# gatekeepers

GatekeeperOS is an independent project. It is not affiliated with or endorsed by the OpenClaw Foundation. OpenClaw is a trademark of its owner.

Community gatekeepers for [GatekeeperOS](https://github.com/gatekeeper-os/gatekeeper-os): one folder per external service, each an OpenClaw plugin built on `@gatekeeper-os/gatekeeper-kit`.

**capability-based access and deferred approvals for OpenClaw**

A gatekeeper is the driver through which an agent reaches one service. It holds the credentials (the agent never sees them), exposes a small set of capability-oriented tools that take a grant handle, logs every read, queues every write for human approval, and simulates the write locally so the agent keeps working in the meantime.

All four reference drivers — **fs**, **github**, **mcp**, and **http** — live in the [core repository](https://github.com/gatekeeper-os/gatekeeper-os), at `packages/gatekeeper-fs`, `packages/gatekeeper-github`, `packages/gatekeeper-mcp`, and `packages/gatekeeper-http`. This is a location rule, not a claim that every driver is release-ready; check each driver’s current plan and evidence in core. Community service drivers live here, one folder per vendor.

**Tier 1: new-scope registry builds (pending publication).** This staged change
pins `@gatekeeper-os/gatekeeper-kit` and `@gatekeeper-os/shared` to
`0.1.0-beta.2`. It must remain unmerged until Matt publishes, the registry lockfile
is regenerated, and all registry build and live core-skill checks pass.
The starter remains private and inert, not a runnable community service. Tool-surface
PRs remain welcome and the two reviews are still required.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm test
pnpm check:secrets
```

CI also fetches current core `main` and compares the complete write-gatekeeper
skill tree. While core is private, this requires the dedicated Actions secret
`CORE_SKILL_READ_TOKEN` with read-only contents access to core. No pinned-snapshot
fallback is accepted, and checkout credentials are not persisted for build steps.

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
