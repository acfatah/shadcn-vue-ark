import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Table } from '@/components/ui/table'
import { registryItem } from '@/components/ui/table/_registry'

import TableDefaultStory from './TableDefaultStory.vue'
import TableDefaultSource from './TableDefaultStory.vue?raw'

const meta = {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: TableDefaultSource,
      },
    },
  },

  render: args => ({
    components: { TableDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <TableDefaultStory v-bind="args" />
    `,
  }),
}
