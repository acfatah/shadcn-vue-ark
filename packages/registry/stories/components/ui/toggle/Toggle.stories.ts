import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { Toggle } from '@/components/ui/toggle'
import { registryItem } from '@/components/ui/toggle/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import ToggleDefaultStory from './ToggleDefaultStory.vue'
import ToggleDefaultSource from './ToggleDefaultStory.vue?raw'
import ToggleDemoStory from './ToggleDemoStory.vue'
import ToggleDemoSource from './ToggleDemoStory.vue?raw'

const meta = {
  title: 'Components/UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],

  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
  },

  argTypes: {
    variant: selectArg(['default', 'outline'], 'default'),
    size: selectArg(['default', 'sm', 'lg'], 'default'),
    pressed: boolArg('Controlled pressed state.'),
    defaultPressed: boolArg('Initial pressed state (uncontrolled).'),
    disabled: boolArg(),
    asChild: boolArg('Render the child element as the toggle (polymorphic).'),
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
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ToggleDefaultStory, ToggleDefaultSource),

  // Core flow: clicking toggles the pressed (data-state) value.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: /toggle bold/i })

    await expect(toggle).toHaveAttribute('data-state', 'off')
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('data-state', 'on')
  },
}

export const Outline: Story = {
  args: { variant: 'outline' },
  ...renderRaw(ToggleDefaultStory, ToggleDefaultSource),
}

export const Disabled: Story = {
  args: { disabled: true },
  ...renderRaw(ToggleDefaultStory, ToggleDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(ToggleDemoStory, ToggleDemoSource),
}
