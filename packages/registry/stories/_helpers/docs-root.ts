/**
 * Wrap a namespace root so the autodocs primary ArgTypes tab reads the dotted
 * public name (e.g. "Card.Root") instead of the filename-inferred component
 * name ("CardRoot"). The label is sourced from vue-component-meta's
 * __docgenInfo.displayName; the runtime `name` is set too for any other
 * name-based code path. Keeps meta.component set so ArgTypes inference and the
 * argtypes-drift guard still resolve props.
 *
 * Generic <C> preserves the exact component type, so `component` stays typed as
 * `Foo.Root` under the annotation `Meta<typeof Foo.Root>`.
 */
export function docsRoot<C>(component: C, displayName: string): C {
  return {
    ...(component as object),
    name: displayName,
    __docgenInfo: {
      ...(component as { __docgenInfo?: Record<string, unknown> }).__docgenInfo,
      displayName,
    },
  } as unknown as C
}
