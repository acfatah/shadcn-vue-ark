# Story Defect Log

Ledger for defects surfaced while authoring comprehensive Storybook
stories. Story work is strictly additive (it never edits
`packages/registry/src/components/**`), so every real component bug,
accessibility violation, or argTypes drift found during authoring is
recorded here and left for a separate fix pass.

See the plan in
[PLAN-Storybook-Comprehensive-Stories.md](../PLAN-Storybook-Comprehensive-Stories.md).

## Relationship to the conformance audit

This log does not re-derive
[AUDIT-ui-component-conformance.md](AUDIT-ui-component-conformance.md).
That audit is the canonical source for structural and metadata defects
(it was static-only). This log:

- Links to an audit finding (`audit_ref`) when a story reproduces one.
- Adds net-new defects the audit could not see, chiefly accessibility
  violations (no axe was run before) and runtime or interaction bugs.

## Policy

- `kind = bug`: a runtime or behavioral defect (dropped emit, prop leak).
- `kind = a11y`: an axe violation. Quarantine it with a rule-level
  disable in the story meta, tagged `KNOWN-BUG: <id>`, so CI stays green
  while every other rule still guards. Never blanket `a11y.test: 'off'`.
- `kind = drift`: an argTypes/props mismatch we chose to log, not fix
  (annotate the suppression in the story with `drift-ok: <id>`).
- `status` is only ever `logged` or `triaged` in this effort. Fixing
  belongs to a separate pass.
- `grep -rn "KNOWN-BUG\|drift-ok" packages/registry/stories/` enumerates
  every live suppression; each must map to a row here.

## Schema

| Col | Values |
|---|---|
| `id` | `SDL-001` ... |
| `component` | kebab name under `src/components/ui/` |
| `kind` | `bug` / `a11y` / `drift` |
| `severity` | `blocker` / `major` / `minor` / `nit` (audit scale) |
| `surfaced_by` | the exact story export, e.g. `Switch > Invalid` |
| `repro` | one line, or the axe rule id |
| `audit_ref` | `AUDIT #1` / `AUDIT 3.5` / `-` (net-new) |
| `status` | `logged` / `triaged` |

## Defects

Seeded from audit findings expected to surface during authoring. Rows
are confirmed and given an `id` only when a story actually reproduces
them; until then they sit in the watchlist below.

| id | component | kind | severity | surfaced_by | repro | audit_ref | status |
|---|---|---|---|---|---|---|---|
| - | - | - | - | - | - | - | - |

## Watchlist (audit findings to confirm via stories, not yet reproduced)

These are known static-audit defects that comprehensive stories or axe
are likely to expose. Promote a row into the table above (with an `id`)
once a story reproduces it.

| component | likely kind | expected surface | audit_ref |
|---|---|---|---|
| progress | bug | `update:modelValue` never wired; control is inert | AUDIT #1 |
| combobox | bug | class leaks onto `Combobox.Input` (double `:class`) | AUDIT #2 |
| carousel | bug | missing `registryDependencies: ['button']` | AUDIT #5 |
| data-table | bug | no `cn()` / no `class` prop; 5 missing deps; inline props | AUDIT #8 |
| table | bug | orphan `valueUpdater` makes `@tanstack/vue-table` spurious | AUDIT #4 |
| input | drift | 25-control collection; index/namespace export mismatch | AUDIT #7 |
| context-menu | bug | non-Ark `inset`/`variant` leak via incomplete `reactiveOmit` | AUDIT 3.5 |
| dropdown-menu | bug | non-Ark `inset`/`variant` leak via incomplete `reactiveOmit` | AUDIT 3.5 |
| menubar | bug | non-Ark `side` leak via incomplete `reactiveOmit` | AUDIT 3.5 |
