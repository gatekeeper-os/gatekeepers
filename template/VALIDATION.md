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
