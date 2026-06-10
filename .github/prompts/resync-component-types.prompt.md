---
agent: agent
description: Re-sync hand-written component types after an @ark-ui/vue upgrade or type-definition change.
---

# Re-sync Component Types

Use this when **`@ark-ui/vue` (or its `@zag-js/*` deps) is upgraded**, when a
`types.ts` provenance stamp no longer matches the resolved Ark version, or when a
consumer reports a prop/emit that exists in Ark but is missing or wrong locally.

**Read [`docs/CONTEXT-component-types-resync.md`](../../docs/CONTEXT-component-types-resync.md)
first and follow it.** That doc is the full procedure; this prompt only routes you
there and states the non-negotiables.

## Background

Every component under `packages/registry/src/components/ui/` is decoupled from Ark
*types*: its `.vue` / `types.ts` / `context.ts` import **zero TYPES** from
`@ark-ui/vue` or `@zag-js` (runtime **value** imports stay), and `types.ts` is a
faithful 1:1 hand-written copy of Ark's surface, stamped with the Ark version it was
copied from. The original decoupling rules live in
[`docs/CONTEXT-component-types-definition.md`](../../docs/CONTEXT-component-types-definition.md).

## Do

1. Detect the version delta and locate the Ark `.d.ts`
   (`packages/registry/node_modules/@ark-ui/vue/dist/components/<subpath>/` — mind
   the dir→subpath map; resolve via the symlink, **not** a `.bun` find from inside
   the registry).
2. For each affected component, reconcile `types.ts` field-by-field against the
   current Ark `.d.ts` (RootProps / RootEmits, inlined detail types, sub-part props,
   context types) — faithful 1:1; keep `class` / `variant` in the `.vue` local Props.
3. Keep shared-primitive copies **byte-identical** (menu → dropdown-menu /
   context-menu / menubar; dialog → dialog / drawer / sheet / command;
   date-picker → calendar / range-calendar) — verify with `diff`.
4. Bump every touched provenance stamp to the resolved version.
5. Run the gates and stop only when they pass.

## Gates (definition of done)

- **Robust grep** (multi-line / brace-scoped — the scanner is in the resync doc) →
  zero `@ark-ui/vue` / `@zag-js` TYPE imports under `ui/`.
- **`bunx vue-tsc --noEmit`** (NOT `bun run typecheck`, which is `.vue`-blind `tsc`)
  → only the documented accepted baseline (DateValue + `useForwardProps` forwarding);
  no new errors.
- **`bun run registry:build`** clean; built JSON Ark-type-free.
- **`bun run format <dirs>`** clean; shared copies still `diff`-identical.
- Storybook smoke for touched components.

Do **not** "fix" the accepted baseline errors, introduce `@ark-ui/vue` / `@zag-js`
type imports, or move `class` / `variant` into `types.ts` to silence anything. See
the resync doc for the runtime-binding landmines (DateValue, ListCollection,
PositioningOptions).
