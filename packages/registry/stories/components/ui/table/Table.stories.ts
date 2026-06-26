import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Table } from '@/components/ui/table'
import { registryItem } from '@/components/ui/table/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import TableDefaultStory from './TableDefaultStory.vue'
import TableDefaultSource from './TableDefaultStory.vue?raw'

const meta: Meta<typeof Table.Root> = {
  title: 'Components/UI/Table',
  component: docsRoot(Table.Root, 'Table.Root'),
  subcomponents: {
    'Table.Header': Table.Header,
    'Table.Body': Table.Body,
    'Table.Footer': Table.Footer,
    'Table.Head': Table.Head,
    'Table.Row': Table.Row,
    'Table.Cell': Table.Cell,
    'Table.Caption': Table.Caption,
    'Table.Empty': Table.Empty,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
}

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
