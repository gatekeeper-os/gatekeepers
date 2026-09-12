# Gatekeeper skeleton

Follow `SKILL.md` in this folder (two STOP points). Copy `packages/gatekeeper-github` in the core repo
(https://github.com/clawkeeper/openclaw-os) as the reference; `packages/gatekeeper-fs` is the smallest complete example.

```
<vendor>/                        # one folder per service at the root of this repo
├── openclaw.plugin.json     # id gatekeeper-<vendor>, contracts.tools (every gk_* id), clawos.gatekeeper marker
├── package.json             # openclaw.extensions, openclaw.compat (catalog range), peerDependencies.openclaw
├── deploy-inputs.json       # which secrets, console URL, redirect URI template — never credentials
├── src/
│   ├── index.ts             # export default defineGatekeeper({...})
│   ├── vendor.ts            # GatekeeperVendor: describe, connectAccount, getAccount, resources, getTools
│   ├── account.ts           # token store use, refresh, getGatekeeperFor(url)
│   ├── <resource>.ts        # one KitGatekeeper subclass per resource type: observations{}, actions{}, addObserver
│   ├── tools.ts             # GatekeeperToolDef[] — every tool takes `grant`; descriptions never mention approvals
│   ├── simulate.ts          # overlay rules per action kind
│   └── api.ts               # thin wrapper over the vendor HTTP API; errors pass through sanitizeError()
├── README.md                # what it grants, tool list, observer strategy per resource, known limits
└── test/                    # kit harness: fake ApprovalQueue, recorded HTTP fixtures
```

Rules the kit enforces at `defineGatekeeper()` time:
1. Every tool has a `grant` parameter.
2. No tool description contains "approv", "oauth", "cache", "queue", "simulat" (case-insensitive).
3. Every action tool provides `describe(params)` (dry pass) and `apply(params)`; `simulate` is required unless `awaitDecision: true`.
4. Every resource type declares an `observerStrategy`.
5. The gatekeeper never calls `api.registerTool` — the kernel does.

Action lifecycle inside the kit (journaled, persisted per resource instance):
`describe` (dry pass, no side effects) → kernel decides (queue, or native approval if `awaitDecision`) → `submitAction` →
`submitting` → `pending` → `simulate(params, overlay, actionId)` → tool returns success → later `applyAction(id)` →
`applying` → `apply(params, actionId)` → `applied`, overlay entry retired; or `rejectAction(id)` → `rejected`, overlay entry
removed; or `revertAction(id)` → `reverting` → `revert(record)` → `reverted`. A throw during submit/apply/revert leaves the
record `uncertain`, which blocks further actions on that instance until an operator reconciles it — never retry blindly.

Observations: `describe(params)` (dry pass) then `read(params)`; the kit awaits `queue.authorizeObservation()` between them.

OAuth: use `OAuthNonceMachine` (two-stage nonce, 10-minute lifetime, timing-safe compare) and `TokenStore` (AES-256-GCM with
the cell key). Redirect URI: `${gateway.publicOrigin}/os/gatekeeper/<vendor>/oauth/callback` (route registered by the kernel).
