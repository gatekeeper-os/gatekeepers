# Inert gatekeeper starter

GatekeeperOS is an independent project. It is not affiliated with or endorsed by the OpenClaw Foundation. OpenClaw is a trademark of its owner.

**Draft only. Registry-backed builds available; tool-surface reviews still required.** This is a real-file
companion to core's gatekeeper skeleton, not a functioning service or an npm package to publish.
The temporary `gatekeeper-example` id satisfies the old published kit; the unmerged registry-migration PR9 switches to `gkos-gatekeeper-example`. This starter is not a runnable plugin acceptance claim.

It uses `@gatekeeper-os/gatekeeper-kit` and `@gatekeeper-os/shared`, temporarily aliased to the published previous-scope `0.1.0-beta.1` registry versions (see [migration](../MIGRATION.md)); new-scope beta.4 is published, but the registry-migration PR9 remains unmerged. This PR preserves the historical dependency pins; the tool-ownership-fixed kit remains unpublished.
`private: true` prevents accidental publication; do not install this starter in a running cell.

## Start a contribution

1. Follow the root CONTRIBUTING guide and the two STOP reviews in the synced skill. A tool-surface
   PR contains README, tools and resource metadata only; do not copy implementation stubs before STOP 1 approval.
2. After approval, copy this directory to `<vendor>/` at repository root.
   Rename package/plugin/vendor/tool identities and URLs, and match package versions and OpenClaw
   compatibility to the then-current core catalog. `gkos.gatekeeper` is a protocol marker, not an npm scope.
3. From the copied directory: `pnpm install`, `pnpm typecheck`, `pnpm build`.
   Package versions pin the published 0.1.0-beta.1 release.
4. Implement auth, resource access and persistence only after review; request STOP 2 approval before
   responsibilities 4–7. Run kit tests, core conformance and the VM acceptance harness before claiming alpha.

## What these files demonstrate

- `src/index.ts`: the real `defineGatekeeper` API, including pure action descriptors.
- `tools.ts` / `resources.ts`: a required string grant and explicit private-only resource mapping.
- `vendor.ts` / `account.ts`: disconnected, fail-closed lifecycle contracts. No URLs yield a resource.
- `resource.ts`: a `KitGatekeeper` subclass with disabled reads/writes and ephemeral overlay storage.
  The kit owns observation authorization and action submission. The example action truthfully declares
  `awaitDecision: true` / `implementsRevert: false`; it cannot be applied. No native execution is claimed.
- Manifest: `contracts.tools` lists exactly `gk_example_item_get` and `gk_example_item_put`, matching `src/tools.ts`;
  its id matches `defineGatekeeper()`. No catalog enablement is supplied. The fixed kit validates the actual root manifest
  at registration and registers wrappers under the gatekeeper plugin identity. Driver code never calls `api.registerTool`;
  all execution and per-grant narrowing remain kernel-owned.
- Deploy inputs: no secrets. Real drivers declare references, never secret values.

The `.invalid` URL is illustrative. There is no network adapter, connected account, token store,
simulation, revert, or live service test. Do not report successful type-checking
as any of those. See [VALIDATION.md](VALIDATION.md) for registry-build evidence and the separate historical pre-publication check.

The `api.ts` and `simulate.ts` stubs deny every operation; they do not promise a
network adapter or synthetic effect. `resource.ts` remains the kit subclass.

## Tool-ownership compatibility boundary

This template prepares the manifest/source contract for the tool-ownership fix. Its dependencies and lockfile remain pinned
at the historical beta.1 aliases; those artifacts do **not** exercise the new registration validation or catalog-policy
reconciliation. No fixed kit has been published by this change. Keep the historical `gatekeeper-example` id while using
that pin; migrate the manifest and definition together to `gkos-gatekeeper-example` when the fixed kit is separately released.

For a real cell using the fixed kit, add the gatekeeper to `os/gatekeepers.json` and run `gkos config apply`. The reconciler
admits enabled catalog plugin ids in messaging `tools.alsoAllow`, removing managed admission on removal/disable. Do not add
community tool names to the kernel manifest or widen native denials, runtime `tools.allow`, or sandbox settings. A grant
is still required. Build/declaration/manifest parity checks below are compatibility evidence, not a packed model-turn pass.
