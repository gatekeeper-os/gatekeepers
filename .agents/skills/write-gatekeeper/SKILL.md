---
name: write-gatekeeper
description: Guides implementation of OpenClaw OS gatekeeper plugins that bridge agents to external services. Covers auth, capability-oriented tool design, approval-queue integration, caching, action simulation, and observer verification. Load when creating, modifying, or reviewing a gatekeeper.
---

# Writing a gatekeeper

A gatekeeper is an OpenClaw plugin, built with `@clawos/gatekeeper-kit`, that is the *only* way an agent reaches one external
service. Read the core repo's `docs/implementation-plan.md` §4 first (https://github.com/clawkeeper/openclaw-os);
`packages/gatekeeper-github` there is the reference and `packages/gatekeeper-fs` is the smallest complete example;
`SKELETON.md` next to this file is the template. There are two mandatory STOP points below — do not proceed past either
without operator approval. If no operator is present, write what needs review into `plans/REVIEW-REQUESTED.md` and end the run.

## Phase 1 — responsibilities 1–3 (auth, API design, granting)

1. **Understand the service.** Auth model (OAuth web/device, PAT, none). Resource types and the granularities that are
   *meaningful* to grant (a repo, an issue — not a single field). Which operations are observations (reads) and which are
   actions (writes). Which actions are reversible.
2. **Design the tool surface** in `src/tools.ts` and resources in `src/resources.ts`: a small group of tools per resource type;
   every tool takes `grant`; structured inputs/outputs, not raw API payloads; simplify for the common case; names
   `gk_<vendor>_<resource>_<verb>`; descriptions say what the tool does and never mention approvals, queues, caching, OAuth,
   or simulation. Decide the URL patterns `getGatekeeperFor()` matches.
3. **STOP 1 — present the tool surface and URL patterns for operator review.** Open a draft PR with only `README.md`,
   `src/tools.ts` and `src/resources.ts`, labelled `tool-surface-review`. Getting the API right is the most important and
   delicate part; getting it wrong means rebuilding.
4. **Implement** `vendor.ts` (describe, connectAccount with `OAuthNonceMachine`, getAccount via `TokenStore`, resources, tools),
   `account.ts` (`getGatekeeperFor(url)` validates access with the operator's own credentials), one `KitGatekeeper` subclass per
   resource type. Pass credentials and resource ids through constructors from the account, never through tool params.
5. **Register**: `openclaw.plugin.json` with `"clawos": { "gatekeeper": { "vendor": "<v>", "apiVersion": 1 } }` and every tool id
   in `contracts.tools`; `package.json` with `openclaw.compat` matching the core catalog; `deploy-inputs.json`; add a row to
   `config/gatekeepers.json` in the core repo.
6. **STOP 2 — ask the operator whether to proceed to Phase 2.** Label the PR `phase-2-review`.

## Phase 2 — responsibilities 4–7 (approvals, caching, simulation, observers)

7. **Approvals.** Every read has a `describe()` (dry pass) and awaits `queue.authorizeObservation()` before returning data.
   Every write is an `ActionImpl` with `describe()` (dry pass, side-effect free), `simulate()`, `apply()`, optional `revert()`.
   Set `implementsRevert` truthfully; set `awaitDecision: true` only when simulation is impossible. Otherwise the security
   model is broken. Treat ambiguous outcomes (a throw during submit or apply) as `uncertain`, never as a retry.
8. **Caching** in the gatekeeper's private state dir, bounded. **Simulation**: overlay-at-read (kit default, persisted
   `OverlayStore`) or mutate-the-cache (`CacheMutationStore`); the kit re-applies pending actions whenever the overlay reloads.
9. **Observers.** Choose per resource type: A private-only, B ACL check, C dataset tracking, D low-stakes. Use C only when the
   binding spans sub-resources with distinct ACLs *and* there is a per-observer oracle. Distinguish "no access" (403/404 →
   false) from transient errors (throw) so failures are loud. Beta grants are owner-only; the strategy is declared now and
   enforced when shared audiences ship.
10. **Conformance**: run the driver through the core repo's VM harness (`docs/vm-testing.md`) — gatekeeper-specific suites plus
    the kit harness tests; the secret-leak grep over source and artifacts must pass.

## Gotchas
- Types and descriptions leak nothing about internals; the agent must not be able to tell an action was simulated.
- Never store the approval queue beyond the session; never mint tools yourself — the kernel registers them.
- Errors to the agent go through `sanitizeError()`; log numeric error codes only — vendor error messages can echo caller input.
- A resource never becomes ambient by the gatekeeper's own doing.
