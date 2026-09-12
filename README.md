# gatekeepers

Community gatekeepers for [OpenClaw OS](https://github.com/clawkeeper/openclaw-os): one folder per external service, each an OpenClaw plugin built on `@clawos/gatekeeper-kit`.

A gatekeeper is the driver through which an agent reaches one service. It holds the credentials (the agent never sees them), exposes a small set of capability-oriented tools that take a grant handle, logs every read, queues every write for human approval, and simulates the write locally so the agent keeps working in the meantime.

The reference implementations — `gatekeeper-fs` and `gatekeeper-github` — live in the core repo and are the best examples to read first.

## Gatekeepers

| Service | Folder | Status | Observer strategy |
|---|---|---|---|
| _(none yet — see the wanted list)_ | | | |

Status: **draft** (tool surface under review) → **alpha** (works, conformance passes) → **stable** (used in anger, simulation and revert covered).

## Wanted

See the [gatekeeper-wanted issues](https://github.com/clawkeeper/gatekeepers/issues?q=is%3Aissue+is%3Aopen+label%3Agatekeeper-wanted). Comment on one to claim it, or open a new one for a service that isn't listed.

## Building one

Follow [`.agents/skills/write-gatekeeper/SKILL.md`](.agents/skills/write-gatekeeper/SKILL.md). It is written so that a coding agent can execute it, and it has two **STOP** points where the tool surface must be reviewed by a human before implementation starts. `SKELETON.md` in the same folder is the file layout to copy.

The one rule that is never negotiable: **every outside-world interaction goes through `authorizeObservation()` or `submitAction()`.** `pnpm conformance --gatekeeper <vendor>` fails if it finds one that doesn't, if any tool description mentions approvals/OAuth/caching/queues, or if any action lacks an `implementsRevert` declaration.

## License

MIT. The gatekeeper model is adapted from [Cloudflare OS](https://github.com/cloudflare/cloudflare-os); see `NOTICE`.
