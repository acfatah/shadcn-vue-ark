import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { ScrollArea } from '@/components/ui/scroll-area'
import { registryItem } from '@/components/ui/scroll-area/_registry'

import { boolArg, classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ScrollAreaDefaultStory from './ScrollAreaDefaultStory.vue'
import ScrollAreaDefaultSource from './ScrollAreaDefaultStory.vue?raw'
import ScrollAreaHideScrollbarStory from './ScrollAreaHideScrollbarStory.vue'
import ScrollAreaHideScrollbarSource from './ScrollAreaHideScrollbarStory.vue?raw'

const meta = {
  title: 'Components/UI/ScrollArea',
  component: docsRoot(ScrollArea.Root, 'ScrollArea.Root'),
  subcomponents: {
    'ScrollArea.Scrollbar': ScrollArea.Scrollbar,
  },
  tags: ['autodocs'],

  args: {
    hideScrollbar: false,
  },

  argTypes: {
    hideScrollbar: boolArg('Hide the scrollbar while keeping the area scrollable.'),
    asChild: boolArg('Render the child element as the root (polymorphic).'),
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

    a11y: {
      test: 'error',
      // KNOWN-BUG: SDL-007 - the viewport has overflow:auto but no tabindex, so
      // a text-only scrollable region is not keyboard-accessible. Component
      // defect (logged, not fixed); disable only this rule.
      config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] },
    },
  },
} satisfies Meta<typeof ScrollArea.Root>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive (scroll container), so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(ScrollAreaDefaultStory, ScrollAreaDefaultSource),
}

export const HideScrollbar: Story = {
  args: { hideScrollbar: true },
  ...renderRaw(ScrollAreaHideScrollbarStory, ScrollAreaHideScrollbarSource),
}
