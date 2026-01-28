import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Sheet } from '@/components/ui/sheet'
import { registryItem } from '@/components/ui/sheet/_registry'

import SheetDefaultStory from './SheetDefaultStory.vue'
import SheetDefaultSource from './SheetDefaultStory.vue?raw'

const meta = {
  title: 'Components/Sheet',
  component: Sheet.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      height: '300px',
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SheetDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SheetDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SheetDefaultStory v-bind="args" />
    `,
  }),
}
