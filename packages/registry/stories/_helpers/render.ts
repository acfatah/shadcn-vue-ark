import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Component } from 'vue'

interface RenderRawOptions {
  /**
   * Override the source shown in the docs code panel. Defaults to `rawSource`.
   * Use only for the rare case where the `Default` story should display a demo
   * source different from the rendered `*Story.vue` (an existing exception).
   */
  source?: string

  /**
   * Story-level markdown description, emitted under `docs.description.story`.
   */
  description?: string

  /**
   * Extra story `parameters` (e.g. `controls.exclude`, an `a11y` override).
   * Merged into the returned parameters with `docs` deep-merged, so a story is
   * always a single spread and never hits the spread-then-override footgun that
   * would drop `docs.source.code`.
   */
  parameters?: Record<string, unknown>
}

/**
 * Render a `*Story.vue` with `v-bind="args"` and pin its `?raw` source into the
 * docs code panel. Collapses the ~18-line `render` + `parameters` block that
 * repeats across every export down to one spread:
 *
 * ```ts
 * export const Default: Story = {
 *   ...renderRaw(BadgeDefaultStory, BadgeDefaultSource),
 * }
 *
 * export const Variants: Story = {
 *   ...renderRaw(VariantsStory, VariantsSource, {
 *     parameters: { controls: { exclude: ['variant'] } },
 *   }),
 * }
 * ```
 *
 * The exact `?raw` string is preserved so the code panel matches the file on
 * disk byte for byte. The component is registered under a fixed local name, so
 * the rendered output is identical regardless of the source variable name.
 */
export function renderRaw<TMeta extends Meta = Meta>(
  component: Component,
  rawSource: string,
  options?: RenderRawOptions,
): Pick<StoryObj<TMeta>, 'render' | 'parameters'> {
  const extra = options?.parameters ?? {}
  const extraDocs = (extra.docs as Record<string, unknown>) ?? {}

  return {
    parameters: {
      ...extra,
      docs: {
        ...extraDocs,
        source: {
          code: options?.source ?? rawSource,
        },
        ...(options?.description
          ? { description: { story: options.description } }
          : {}),
      },
    },

    render: ((args: Record<string, unknown>) => ({
      components: { Story: component },

      setup() {
        return { args }
      },

      template: `<Story v-bind="args" />`,
    })) as StoryObj<TMeta>['render'],
  }
}
