# GatekeeperOS identifier migration

The project is now GatekeeperOS: capability-based access and deferred approvals for OpenClaw.
GitHub uses `gatekeeper-os/gatekeeper-os`, `gatekeeper-os/gatekeepers`, and
`gatekeeper-os/.github`. Package imports use `@gatekeeper-os/*`; the CLI is `gkos`.

## Kernel-owned drivers — beta.6

Kit `0.1.0-beta.6` (core PR #30) splits every gatekeeper into two modules:

- `src/driver.ts` exports `defineGatekeeperDriver({...})` from `@gatekeeper-os/gatekeeper-kit`.
  The kernel loads this module directly, so it must never import `openclaw`.
- `src/index.ts` is `export default defineGatekeeper(driver)`, imported from
  `@gatekeeper-os/gatekeeper-kit/plugin`. The kit root entry no longer exports `defineGatekeeper`.
- `openclaw.plugin.json` declares `"driver": "./dist/driver.js"` under `gkos.gatekeeper`.
- The build is `tsup src/index.ts src/driver.ts --format esm --dts --clean`.
- `gatekeeperRuntimeSlot`, `kernelToolRuntimeSlot` and `GatekeeperRuntime` were removed.

The template follows core's `packages/gkos-gatekeeper-fs` layout and pins kit and shared at exact
`0.1.0-beta.6`. `scripts/template.test.mjs` loads the built driver in a fresh process and fails if it
resolves any `openclaw` module. The pinned write-gatekeeper skill is synced to core `262b80b` (`v0.1.0-beta.6`).

## Registry migration complete — beta.5

The template now pins the real `@gatekeeper-os/gatekeeper-kit` and
`@gatekeeper-os/shared` packages at exact `0.1.0-beta.5`, with a lockfile generated
from npm. The previous-scope beta.1 npm aliases are no longer used. The plugin
identity is `gkos-gatekeeper-example`, matching beta.5 kit validation; its own
manifest retains the exact tool contracts introduced by PR12.

Core npm-only acceptance passed on Node22.22.3 before this switch (run
`20260916-220009-phase-3`, core PR24). Community template typecheck/build/tests are
separate Tier1 evidence, not live service or connected-provider acceptance.

## Intentional old-name survivors

- `template/VALIDATION.md` retains the historical Tier 0 receipt as written.
- This migration note names the old npm scope to explain the transition.
- `LICENSE`, `NOTICE`, `template/LICENSE`, and `template/NOTICE` retain historical
  copyright and attribution text unchanged, including historical repository URLs.

Cloudflare OS attribution and NOTICE contents are unchanged.
