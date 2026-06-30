import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { ToggleGroup } from '@/components/ui/toggle-group'
import { registryItem } from '@/components/ui/toggle-group/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ToggleGroupDefaultStory from './ToggleGroupDefaultStory.vue'
import ToggleGroupDefaultSource from './ToggleGroupDefaultStory.vue?raw'
import ToggleGroupDemoStory from './ToggleGroupDemoStory.vue'
import ToggleGroupDemoSource from './ToggleGroupDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/ToggleGroup',
  component: docsRoot(ToggleGroup.Root, 'ToggleGroup.Root'),
  subcomponents: {
    'ToggleGroup.Item': ToggleGroup.Item,
  },
  tags: ['autodocs'],

  args: {
    disabled: false,
  },

  argTypes: {
    variant: selectArg(['default', 'outline'], 'default'),
    size: selectArg(['default', 'sm', 'lg'], 'default'),
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    multiple: boolArg('Allow more than one item to be pressed.'),
    deselectable: boolArg(),
    disabled: boolArg(),
    loopFocus: boolArg(),
    rovingFocus: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    spacing: { control: 'number' },
    defaultValue: { control: 'object' },
    modelValue: { control: 'object' },
    id: { control: 'text' },
    ids: { control: 'object' },
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof ToggleGroup.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ToggleGroupDefaultStory, ToggleGroupDefaultSource),

  // Core flow: clicking an item toggles its pressed (data-state) value.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const bold = canvas.getByRole('button', { name: /toggle bold/i })

    await expect(bold).toHaveAttribute('data-state', 'off')
    await userEvent.click(bold)
    await expect(bold).toHaveAttribute('data-state', 'on')
  },
}

export const Demo: Story = {
  ...renderRaw(ToggleGroupDemoStory, ToggleGroupDemoSource, {
    description: 'Single-select group via `defaultValue`; omit `multiple`.',
  }),
}
