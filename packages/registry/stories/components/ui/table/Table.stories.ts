import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Table } from '@/components/ui/table'
import { registryItem } from '@/components/ui/table/_registry'

import { classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import TableDefaultStory from './TableDefaultStory.vue'
import TableDefaultSource from './TableDefaultStory.vue?raw'

const meta = {
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

  argTypes: {
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
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive layout, so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(TableDefaultStory, TableDefaultSource),
}
