# GatekeeperOS identifier migration

The project is now GatekeeperOS: capability-based access and deferred approvals for OpenClaw.
GitHub uses `gatekeeper-os/gatekeeper-os`, `gatekeeper-os/gatekeepers`, and
`gatekeeper-os/.github`. Package imports use `@gatekeeper-os/*`; the CLI is `gkos`.

## Temporary registry bridge

The new-scope `0.1.0-beta.2` packages are not published yet. For this rename PR only,
`@gatekeeper-os/gatekeeper-kit` and `@gatekeeper-os/shared` are explicit npm aliases
for `@clawkeepers/gatekeeper-kit@0.1.0-beta.1` and
`@clawkeepers/shared@0.1.0-beta.1`. The lockfile retains registry integrity hashes;
`check-registry.mjs` verifies the exact old published identities and versions, not
workspace links. The unchanged kit API supports renamed source imports. Its driver id validator
still requires `gatekeeper-example`; the inert template retains that id only for
this registry bridge. The staged beta.2 switch changes it to
`gkos-gatekeeper-example` without weakening validation.

A separate, unmerged Tier 1 change switches to exact new-scope `0.1.0-beta.2`
dependencies after publication. It must install from the registry and pass live
core-skill sync, typecheck, build, defineGatekeeper validation, and secret checks.
No local package replacement may stand in for that gate.

## Intentional old-name survivors

- `template/VALIDATION.md` retains the historical Tier 0 receipt as written.
- This migration note names the old npm scope to explain the transition.
- `template/package.json`, `pnpm-lock.yaml`, and `scripts/check-registry.mjs` retain
  the old published identities solely for the explicit temporary registry bridge.
- `LICENSE`, `NOTICE`, `template/LICENSE`, and `template/NOTICE` retain historical
  copyright and attribution text unchanged, including historical repository URLs.

Cloudflare OS attribution and NOTICE contents are unchanged.

## Staged beta.2 switch (do not merge yet)

The separate `prepare/tier1-gatekeeperos-beta2` worktree changes dependencies to
exact new-scope beta.2 and the driver id to `gkos-gatekeeper-example`. No registry
metadata is invented: the existing lockfile is deliberately retained and will
not pass frozen install. Only after Matt publishes, run `pnpm install --lockfile-only`
against npm, inspect exact package identities and integrity hashes, then run
frozen install, typecheck, build, tests, secret check, and live core skill sync.
Merge requires green `build-test` and publication confirmation.
