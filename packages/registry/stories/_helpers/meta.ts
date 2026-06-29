import type { Meta } from '@storybook/vue3-vite'

interface StoryMetaOptions<C> {
  /**
   * Display name. Becomes the `Components/UI/<name>` title and the docs
   * heading. Kept explicit because Ark namespace objects carry no clean
   * display name to infer it from.
   */
  name: string

  /**
   * The component. Flat components pass the component directly; compound
   * (namespace) components pass their `docsRoot`-wrapped Root, e.g.
   * `docsRoot(Dialog.Root, 'Dialog.Root')`, so the story-shape check and the
   * autodocs primary tab both resolve the dotted name.
   */
  component: C

  /** `registryItem.description`, pinned into `docs.description.component`. */
  description?: string

  /** Dotted-key subcomponents map for compound components. */
  subcomponents?: Meta<C>['subcomponents']

  /**
   * Per-component `argTypes`. Kept at the call site so they stay literal and
   * greppable for the argTypes-drift check.
   */
  argTypes?: Meta<C>['argTypes']

  /** Extra `parameters`, shallow-merged after the docs description. */
  parameters?: Meta<C>['parameters']
}

/**
 * Build the identical meta head every story repeats: the `Components/UI/<Name>`
 * title, the `autodocs` tag, and the description sourced from
 * `registryItem.description`. Returns `Meta<C>` so the call site keeps
 * `satisfies Meta<typeof X>` as its only compiler signal.
 */
export function defineStoryMeta<C>(options: StoryMetaOptions<C>): Meta<C> {
  const { argTypes, component, description, name, parameters, subcomponents }
    = options

  // Deep-merge the docs block so caller-supplied parameters.docs.* (e.g. `toc`,
  // a story description) coexist with the registryItem description instead of a
  // shallow spread clobbering the whole `docs` key. A caller-supplied
  // docs.description.component still wins as an explicit override.
  const callerDocs = parameters?.docs ?? {}
  const mergedDescription = {
    ...(description ? { component: description } : {}),
    ...callerDocs.description,
  }
  const docs = {
    ...callerDocs,
    ...(Object.keys(mergedDescription).length
      ? { description: mergedDescription }
      : {}),
  }

  return {
    title: `Components/UI/${name}`,
    component,
    ...(subcomponents ? { subcomponents } : {}),
    tags: ['autodocs'],
    ...(argTypes ? { argTypes } : {}),
    parameters: {
      ...parameters,
      ...(Object.keys(docs).length ? { docs } : {}),
    },
  } as Meta<C>
}
