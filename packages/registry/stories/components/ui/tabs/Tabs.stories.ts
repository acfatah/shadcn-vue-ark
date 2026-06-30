import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Tabs } from '@/components/ui/tabs'
import { registryItem } from '@/components/ui/tabs/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import TabsDefaultStory from './TabsDefaultStory.vue'
import TabsDefaultSource from './TabsDefaultStory.vue?raw'
import TabsUnderlineStory from './TabsUnderlineStory.vue'
import TabsUnderlineSource from './TabsUnderlineStory.vue?raw'

const meta = {
  title: 'Components/UI/Tabs',
  component: docsRoot(Tabs.Root, 'Tabs.Root'),
  subcomponents: {
    'Tabs.List': Tabs.List,
    'Tabs.Trigger': Tabs.Trigger,
    'Tabs.Indicator': Tabs.Indicator,
    'Tabs.Content': Tabs.Content,
  },
  tags: ['autodocs'],

  args: {
    variant: 'pill',
  },

  argTypes: {
    variant: selectArg(['pill', 'underline'], 'pill'),
    activationMode: selectArg(['automatic', 'manual'], 'automatic'),
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    composite: boolArg(),
    deselectable: boolArg(),
    loopFocus: boolArg(),
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    defaultValue: { control: 'text' },
    modelValue: { control: 'text' },
    navigate: { control: false },
    translations: { control: 'object' },
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
} satisfies Meta<typeof Tabs.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(TabsDefaultStory, TabsDefaultSource),

  // Core flow: clicking a tab activates it (Ark exposes aria-selected).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const passwordTab = canvas.getByRole('tab', { name: 'Password' })

    await expect(passwordTab).toHaveAttribute('aria-selected', 'false')
    await userEvent.click(passwordTab)
    await waitFor(() => expect(passwordTab).toHaveAttribute('aria-selected', 'true'))
  },
}

export const Underline: Story = {
  args: { variant: 'underline' },
  ...renderRaw(TabsUnderlineStory, TabsUnderlineSource),
}
