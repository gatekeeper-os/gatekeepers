# Published beta.5 Tier1 migration — 2026-09-16

The template now depends directly on registry `@gatekeeper-os/gatekeeper-kit`
and `@gatekeeper-os/shared`, both exact `0.1.0-beta.5`; no npm aliases, core source
links or local archives. The pnpm lockfile is regenerated from npm. The manifest
and definition both use `gkos-gatekeeper-example` and retain the exact own-tool
contracts from PR12. Registry identity and manifest-parity tests cover those
properties. Final build/test results are recorded below after execution.

Core's separate npm-only run `20260916-220009-phase-3` passed on guest Node22.22.3,
upstream2026.9.2, with independent-gatekeeper approval effects and audit, before
core PR24 merged at `56987a5a1d191185396bfde702f77514859f0c59`. That does not turn
this inert starter into a live community service or establish connected-provider
acceptance. Real filesystem application remains disabled in the beta.

Current CI verifies pinned skill parity and probes anonymous core readability.
While core is private, the live fetch step is explicitly skipped, not passed;
after the public flip it must run and pass. No credential workaround is introduced.

## Historical evidence (unchanged; not current dependency state)

# Tool-contract source preparation — 2026-09-15

The template root manifest now declares its own exact tool names and matching id. The template test compares the actual
TypeScript tool declarations with the manifest; the synced authoring skill describes the fixed kit's registration and
catalog reconciliation. Dependencies and the dependency lockfile are unchanged. Historical beta.1 alias builds do not test
the new kit runtime validation, grant narrowing, or model-tool visibility. No fixed release or live acceptance is claimed.

# Registry-backed validation — 2026-09-12

The renamed imports currently resolve through explicit npm aliases to previous-scope
kit/shared at exact `0.1.0-beta.1` from npm via the committed
pnpm lockfile. No core source aliases, workspace links, or local tarballs are used.
`pnpm typecheck`, `pnpm build`, `pnpm test`, and `pnpm check:secrets` verify the
inert template; import of its built entry executes the published kit's synchronous
`defineGatekeeper()` declaration validation. This is not runtime service acceptance.

Live skill synchronization is a separate gate: it fetches current private core
main, compares the complete file tree, and fails if unreadable or different.

## Historical Tier 0 evidence (superseded, not registry acceptance)

# Pre-publication validation

Validated 2026-09-12 against core commit `08cd8d8b8e44fd0180cd0ebbc47ba8f244b07f3e`.
The API checks below use that core tree. The repository-owned skill directory was subsequently
resynced byte-for-byte from core’s `phase9-release-preparation` scope-migration worktree,
which updates the npm scope to `@clawkeepers`; the API remains unchanged.

The starter was copied into a temporary directory outside either repository. Temporary
`node_modules/@clawkeepers/gatekeeper-kit` and `node_modules/@clawkeepers/shared` aliases
pointed to the current core packages; TypeBox resolved from the kit’s local dependency,
and other tooling resolved from core’s existing local install. No package was fetched or
published, and no aliases or generated output are committed.

Checks in that isolated copy:

```sh
tsc -p tsconfig.json --noEmit
tsup src/index.ts --format esm --dts --clean
node --input-type=module -e 'const { default: entry } = await import("./dist/index.js"); if (entry.id !== "gatekeeper-example") throw new Error("Unexpected identity");'
```

All passed, including the actual kit’s synchronous declaration validation at import.
No plugin was registered or started. This is local contract/build evidence only, **not**
an npm install test, runtime integration, conformance, VM acceptance, or a working community driver.
Core’s source still used the pre-publication scope at this checkpoint; the aliases test the
reserved public import names against its current API without claiming registry availability.

Synced skill SHA-256: `ad78cbbcf1ca40da40715cb6b6c77ee199be971ff8969f1d0f5bdd9fdca3b6dc`.

Final addendum refinement: `api.ts`/`simulate.ts` added and all three checks rerun
against the scope-migrated kit. Dependencies now pin the planned `0.1.0-beta.1`
release; no registry availability claimed. Core-skill CI was added but private
cross-repository access is not assumed; an unreadable core is a failing check.


## Beta.5 local results (2026-09-16)

- Registry-generated lockfile, followed by `pnpm install --frozen-lockfile`: PASS.
- `pnpm typecheck`, `pnpm build`, `pnpm test`, `pnpm check:secrets`: PASS.
- Exact installed registry identities for kit/shared beta.5: PASS; both lock
  SHA512 values match the independently downloaded/verified npm archive receipts.
- Built-entry declaration validation and own-manifest/tool/id parity: 2/2 PASS.
- Reviewed pinned skill snapshot and all five anonymous-sync protocol fixtures:
  PASS. Byte parity against merged core56987a5 also verified locally. This is not
  evidence that anonymous live sync ran; core remains private.
- No package publication, runtime product patch, visibility/tag/publisher changes,
  release workflow rerun, phase tag or upstream post.

Community merge remains gated on green `build-test` at this PR's final head.
