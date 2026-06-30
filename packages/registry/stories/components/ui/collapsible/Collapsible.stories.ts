import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, within } from 'storybook/test'

import { Collapsible } from '@/components/ui/collapsible'
import { registryItem } from '@/components/ui/collapsible/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import CollapsibleDefaultStory from './CollapsibleDefaultStory.vue'
import CollapsibleDefaultSource from './CollapsibleDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Collapsible',
  component: docsRoot(Collapsible.Root, 'Collapsible.Root'),
  subcomponents: {
    'Collapsible.Trigger': Collapsible.Trigger,
    'Collapsible.Content': Collapsible.Content,
  },
  tags: ['autodocs'],

  args: {
    disabled: false,
  },

  argTypes: {
    defaultOpen: boolArg('Initial open state (uncontrolled).'),
    open: boolArg('Controlled open state.'),
    disabled: boolArg(),
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    collapsedHeight: { control: 'text' },
    collapsedWidth: { control: 'text' },
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
} satisfies Meta<typeof Collapsible.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(CollapsibleDefaultStory, CollapsibleDefaultSource),

  // Core flow: clicking the trigger expands the collapsible.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /toggle/i })

    await expect(trigger).toHaveAttribute('data-state', 'closed')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('data-state', 'open')
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  ...renderRaw(CollapsibleDefaultStory, CollapsibleDefaultSource),
}
