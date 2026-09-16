# GatekeeperOS identifier migration

The project is now GatekeeperOS: capability-based access and deferred approvals for OpenClaw.
GitHub uses `gatekeeper-os/gatekeeper-os`, `gatekeeper-os/gatekeepers`, and
`gatekeeper-os/.github`. Package imports use `@gatekeeper-os/*`; the CLI is `gkos`.

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
- `template/package.json`, `pnpm-lock.yaml`, and `scripts/check-registry.mjs` retain
  the old published identities solely for the explicit temporary registry bridge.
- `LICENSE`, `NOTICE`, `template/LICENSE`, and `template/NOTICE` retain historical
  copyright and attribution text unchanged, including historical repository URLs.

Cloudflare OS attribution and NOTICE contents are unchanged.
