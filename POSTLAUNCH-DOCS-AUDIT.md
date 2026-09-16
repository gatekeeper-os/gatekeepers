# Post-launch documentation survivor audit

2026-09-16 · community · **34 matching source lines in 16 files**.

Scan: every tracked text file plus new documentation in this PR, case-insensitive:

```text
beta\.[234]|private|not published|under consideration|no npm|clawkeeper|openclaw-os
```

This generated report is excluded from its own input to avoid recursive matches; its search terms, quoted snippets and source paths intentionally repeat the findings below. No other path exclusion is applied. Old-version release notes, changelog, PROGRESS and migration matches are retained and enumerated, even though those histories are exempt from rewriting. One row accounts for every matching source line; multiple terms on that line are listed together. Line numbers refer to this PR tree.

Current state: five packages at 0.1.0-beta.5, beta = latest, no stable release; all three repositories public. Historical failures are not reclassified. Native approval advisory GHSA-22jj-m53c-524m was closed as requiring no upstream change on 2026-09-12; synchronous approval remains default-off by GatekeeperOS log-hygiene choice. No product logic, version, tag, registry write or upstream post is part of this change. Non-Markdown edits are documentation only: core installer comments/help, one installer-test receipt description, and the community snapshot-checker docstring.

## Survivors

| Source | Matched terms | Reason |
|---|---|---|
| [.agents/skills/write-gatekeeper/SKILL.md:47](.agents/skills/write-gatekeeper/SKILL.md#L47) | `private` | Owner-only audience/resource boundary or protected conversation data; public repositories do not make user data public. |
| [.github/live-core-sync.sh:6](.github/live-core-sync.sh#L6) | `private` | Removed privacy-era skip or fail-closed negative case: missing/nonpublic core must fail, not evidence that core is currently nonpublic. |
| [.github/test-live-core-sync.py:30](.github/test-live-core-sync.py#L30) | `private` | Removed privacy-era skip or fail-closed negative case: missing/nonpublic core must fail, not evidence that core is currently nonpublic. |
| [CONTRIBUTING.md:64](CONTRIBUTING.md#L64) | `private` | Owner-only audience/resource boundary or protected conversation data; public repositories do not make user data public. |
| [CONTRIBUTING.md:70](CONTRIBUTING.md#L70) | `private` | Removed privacy-era skip or fail-closed negative case: missing/nonpublic core must fail, not evidence that core is currently nonpublic. |
| [LICENSE:3](LICENSE#L3) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [NOTICE:1](NOTICE#L1) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [NOTICE:2](NOTICE#L2) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [NOTICE:12](NOTICE#L12) | `clawkeeper`, `openclaw-os` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [NOTICE:17](NOTICE#L17) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [README.md:32](README.md#L32) | `private` | Removed privacy-era skip or fail-closed negative case: missing/nonpublic core must fail, not evidence that core is currently nonpublic. |
| [README.md:34](README.md#L34) | `private` | Removed privacy-era skip or fail-closed negative case: missing/nonpublic core must fail, not evidence that core is currently nonpublic. |
| [README.md:41](README.md#L41) | `private` | Removed privacy-era skip or fail-closed negative case: missing/nonpublic core must fail, not evidence that core is currently nonpublic. |
| [package.json:3](package.json#L3) | `private` | npm publication metadata (boolean), independent of GitHub repository visibility; no metadata change authorized. |
| [scripts/check-secrets.sh:4](scripts/check-secrets.sh#L4) | `private` | Credential/cryptographic key protection or synthetic secret-scan fixture; not repository visibility. |
| [template/LICENSE:3](template/LICENSE#L3) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [template/NOTICE:1](template/NOTICE#L1) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [template/NOTICE:2](template/NOTICE#L2) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [template/NOTICE:12](template/NOTICE#L12) | `clawkeeper`, `openclaw-os` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [template/NOTICE:17](template/NOTICE#L17) | `clawkeeper` | Legal provenance: preserve original copyright, attribution and source URLs verbatim. |
| [template/README.md:12](template/README.md#L12) | `private` | Technical privacy boundary: protected state, credentials, SDK internals, test audience or operator-only data; not a claim of nonpublic repository status. |
| [template/README.md:29](template/README.md#L29) | `private` | Owner-only audience/resource boundary or protected conversation data; public repositories do not make user data public. |
| [template/VALIDATION.md:5](template/VALIDATION.md#L5) | `private` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:9](template/VALIDATION.md#L9) | `private` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:16](template/VALIDATION.md#L16) | `no npm` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:29](template/VALIDATION.md#L29) | `private` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:50](template/VALIDATION.md#L50) | `private` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:60](template/VALIDATION.md#L60) | `clawkeeper` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:63](template/VALIDATION.md#L63) | `clawkeeper` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:86](template/VALIDATION.md#L86) | `private` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/VALIDATION.md:99](template/VALIDATION.md#L99) | `private` | Dated validation/migration receipt: opening current-status section explicitly supersedes earlier repository privacy, alias and skipped-fetch evidence. |
| [template/package.json:4](template/package.json#L4) | `private` | npm publication metadata (boolean), independent of GitHub repository visibility; no metadata change authorized. |
| [template/src/account.ts:4](template/src/account.ts#L4) | `private` | Technical privacy boundary: protected state, credentials, SDK internals, test audience or operator-only data; not a claim of nonpublic repository status. |
| [template/src/resources.ts:5](template/src/resources.ts#L5) | `private` | Owner-only audience/resource boundary or protected conversation data; public repositories do not make user data public. |
