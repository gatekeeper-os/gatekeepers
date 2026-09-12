# REVIEW.md — review priority for gatekeeper PRs, highest first

1. **Capability invariants.** Every tool takes `grant`; the plugin never calls `api.registerTool`; credentials and resource
   identifiers come from the account/constructor, never from tool parameters; `getGatekeeperFor(url)` validates access with
   the operator's own credentials and never widens a narrow grant (an issue grant is not a repo grant).
2. **Approval coverage.** Every read: `describe()` + `authorizeObservation()` before returning data. Every write: an
   `ActionImpl` with a side-effect-free `describe()`, a `simulate()` (unless `awaitDecision`), an idempotent `apply()`, and a
   truthful `implementsRevert`. No outside-world call outside those paths. Ambiguous outcomes stay `uncertain`.
3. **Secret leakage** through logs, tool results, error strings, fixtures, `deploy-inputs.json`, or README examples. Vendor
   errors pass through `sanitizeError()`; log numeric codes only.
4. **Tool surface quality** (STOP 1): meaningful granularities, structured inputs/outputs, bounded results with explicit
   truncation, descriptions that never mention approvals/queues/caching/OAuth/simulation.
5. **Observer strategy** declared per resource type and justified in the README (A/B/C/D rule from the core docs).
6. **Upstream coupling.** Only `openclaw/plugin-sdk/*` imports; `openclaw.compat` matches the core catalog range.
7. Everything else (style, naming, performance).

Client-supplied identity values are diagnostic labels only — never inputs to a decision.
