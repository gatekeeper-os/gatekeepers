# AGENTS.md — operating rules for agents working in this repository

This repo holds community gatekeepers for GatekeeperOS. The kernel, contracts and kit live in the core repo
(https://github.com/gatekeeper-os/gatekeeper-os); read its `docs/implementation-plan.md` §4 before writing a driver.

## Invariants (same as the core repo, restated for drivers)
1. **No upstream modification.** Never patch, fork, vendor, or monkey-patch `openclaw`. Import only `openclaw/plugin-sdk/*`
   and `@gatekeeper-os/gatekeeper-kit` / `@gatekeeper-os/shared`. Never read upstream's SQLite. Never write under the upstream install root.
2. **Capabilities.** Every tool takes `grant`. Never call `api.registerTool` directly — `defineGatekeeper()` owns the tool wrappers under your plugin identity and
   funnels every call through the kernel and `resolveGrant()`. Your root manifest id and exact `contracts.tools` must match
   the definition. Catalog reconciliation manages messaging `tools.alsoAllow`; never widen native/runtime/sandbox policy. A resource becomes ambient only through operator configuration; a gatekeeper
   never asserts its own ambience.
3. **Approvals.** Every read is authorized through `authorizeObservation()` before data returns; every write goes through
   `submitAction()` and is applied only by `applyAction()` after an operator decision. `awaitDecision: true` only when
   simulation is impossible. Ambiguous outcomes are `uncertain`, never retried.
4. **Secrecy.** Never log secrets, prompts, headers, tokens, or request/response bodies. Vendor errors go through
   `sanitizeError()`. Tool descriptions never mention approvals, queues, caching, OAuth, or simulation.

## How we work
Follow `.agents/skills/write-gatekeeper/SKILL.md` and honor its two STOP points (open the tool-surface PR at STOP 1; ask
before Phase 2). One folder per vendor at the repo root. Acceptance is a VM run through the core repo's harness
(`docs/vm-testing.md`); a driver with no live evidence is `draft`, not `alpha`. When reality contradicts the skill or
skeleton, fix the doc in the same PR.

## Git and reporting
Conventional commits. Never commit credentials, `deploy-inputs.json` with real values, recorded fixtures containing tokens,
or VM artifacts. If you are unattended and reach a STOP point, write `plans/REVIEW-REQUESTED.md` and end the run.

## Stop when
an invariant would break; a STOP point is reached; a conformance check fails twice with no clear cause; the vendor's API
cannot support a meaningful grant granularity (say so in the README rather than widening the grant).
