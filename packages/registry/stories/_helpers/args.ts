/**
 * Arg-builder sugar over Storybook's verbose `argTypes` `table` ceremony.
 *
 * These are per-key helpers, not a schema: each component still lists which
 * props it has at the call site, so `meta.argTypes` stays literal and greppable
 * for the argTypes-drift check.
 */

/** Boolean toggle control, with an optional description. */
export function boolArg(description?: string) {
  return {
    control: { type: 'boolean' as const },
    ...(description ? { description } : {}),
  }
}

/** Select control over a fixed option set, with an optional documented default. */
export function selectArg<const T extends string>(
  options: readonly T[],
  defaultValue?: T,
) {
  return {
    control: { type: 'select' as const },
    options: [...options],
    ...(defaultValue === undefined
      ? {}
      : { table: { defaultValue: { summary: defaultValue } } }),
  }
}

/** `class` prop control: free text merged via `cn()`, grouped under styling. */
export function classArg(description = 'Additional classes merged via `cn()`.') {
  return {
    control: { type: 'text' as const },
    description,
    table: { category: 'styling' },
  }
}

/**
 * Build a boolean argType per state name. Sugar for the common
 * `invalid` / `disabled` / `loading` cluster on form controls.
 */
export function stateArgs<const T extends string>(
  states: readonly T[],
): Record<T, ReturnType<typeof boolArg>> {
  return Object.fromEntries(
    states.map(state => [state, boolArg()]),
  ) as Record<T, ReturnType<typeof boolArg>>
}
