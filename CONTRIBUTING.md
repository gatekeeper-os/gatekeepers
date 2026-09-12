# Contributing a gatekeeper

Read the org-wide [CONTRIBUTING](https://github.com/clawkeeper/.github/blob/main/CONTRIBUTING.md) first. This file is the part specific to drivers.

## The procedure

This is the `write-gatekeeper` skill, condensed. The full version in `.agents/skills/write-gatekeeper/SKILL.md` is what your agent should follow.

**Phase 1 — auth, API, granting**

1. Understand the service: its auth model, which resource granularities are *meaningful* (a repo, an issue — not a single field), which operations are reads vs. writes, which writes are reversible.
2. Design the tool surface in `src/tools.ts`: one small group of tools per resource type, every tool takes `grant`, structured inputs and outputs, simplified for the common case. Decide which URL patterns `getGatekeeperFor()` matches.
3. **STOP.** Open a draft PR containing only `README.md` and `src/tools.ts` and ask for review. The tool surface is the part that is expensive to change later; we review it before anything else is written.
4. Implement from `SKELETON.md`: vendor, account store, OAuth routes with the two-stage nonce from the kit, per-resource gatekeeper, session.
5. Register: `openclaw.plugin.json` with the `clawos.gatekeeper` marker; `package.json` with `openclaw.compat`; add a row to the catalog.
6. **STOP.** Ask whether to proceed to Phase 2.

**Phase 2 — approvals, caching, simulation, observers**

7. Wrap *every* outside-world interaction in `authorizeObservation()` / `submitAction()`.
8. Caching, then simulation (overlay-at-read is the kit default; mutate-the-cache is available), then the observer strategy for each resource type.
9. `pnpm conformance --gatekeeper <vendor>` must pass.

## Folder layout

```
gatekeepers/<vendor>/
├── openclaw.plugin.json     # id gatekeeper-<vendor>, contracts.tools, clawos.gatekeeper marker
├── package.json             # @clawos/gatekeeper-<vendor>, openclaw.compat, peer on openclaw
├── src/
│   ├── index.ts             # export default defineGatekeeper({...})
│   ├── vendor.ts            # describe, connectAccount, resources
│   ├── account.ts           # token store, refresh, getGatekeeperFor
│   ├── <resource>.ts        # one Gatekeeper impl per resource type
│   ├── tools.ts             # GatekeeperToolDef[] (TypeBox)
│   ├── simulate.ts          # overlay rules per action kind
│   └── api.ts               # thin wrapper over the vendor HTTP API
├── deploy-inputs.json       # which secrets, console URL, redirect URI template
├── README.md                # what it grants, tool list, observer strategy, known limits
└── test/
```

## Things reviewers will check

- Tool descriptions never mention approvals, queues, caching, OAuth, or simulation. The abstraction is invisible to the agent.
- No tool is registered by the gatekeeper itself. The kernel registers them.
- Errors returned to the agent are sanitized (no URLs, tokens, vendor bodies) — use `sanitizeError()` from the kit.
- The observer strategy is justified in the README (A private-only, B ACL check, C dataset tracking, D low-stakes) using the rule from the docs: C only when the binding spans sub-resources with distinct ACLs *and* there's a per-observer oracle.
- A resource never becomes ambient by the gatekeeper's own doing.
