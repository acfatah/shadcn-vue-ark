/**
 * Single source of truth for argTypes the story suite never documents.
 *
 * `VUE_INTERNAL_ARGS` are Vue's binding attributes, disabled globally in
 * `preview.ts` so they never show as controls. `SLOT_ARGS` are default slot
 * names that surface as args but are not real props. Both are consumed by:
 *
 * - `.storybook/preview.ts` (via `internalArgTypes`) to build the global
 *   `argTypes` disable map.
 * - `stories/__checks__/argtypes-drift.test.ts` to subtract from both the
 *   declared `argTypes` keys and the component's real prop set.
 *
 * Keeping one list here closes the drift between the disable map and the check
 * (section 8 of PLAN-Storybook-Comprehensive-Stories.md).
 */
export const VUE_INTERNAL_ARGS = ['key', 'ref', 'ref_for', 'ref_key', 'style'] as const

export const SLOT_ARGS = ['default'] as const

/**
 * Global `argTypes` map for `preview.ts`: disables the control and the docs
 * table row for every Vue-internal attribute.
 */
export const internalArgTypes = Object.fromEntries(
  VUE_INTERNAL_ARGS.map(name => [name, { table: { disable: true } }]),
) as Record<(typeof VUE_INTERNAL_ARGS)[number], { table: { disable: true } }>
