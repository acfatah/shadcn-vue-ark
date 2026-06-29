import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { DataTable } from '@/components/ui/data-table'
import { registryItem } from '@/components/ui/data-table/_registry'

import { boolArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import DataTableDefaultStory from './DataTableDefaultStory.vue'
import DataTableDefaultSource from './DataTableDefaultStory.vue?raw'
import DataTableDemoStory from './DataTableDemoStory.vue'
import DataTableDemoSource from './DataTableDemoStory.vue?raw'
import DataTableEmptyStory from './DataTableEmptyStory.vue'
import DataTableEmptySource from './DataTableEmptyStory.vue?raw'
import { columns, payments } from './payments'

const meta = {
  title: 'Components/UI/DataTable',
  component: DataTable,
  tags: ['autodocs'],

  // columns/data are required props supplied per-story via a fixture; they are
  // set here only to satisfy the args type (the Story.vue files own the render).
  args: {
    columns,
    data: payments,
    pagination: true,
    loading: false,
    hideFilter: false,
    hidePagination: false,
  },

  argTypes: {
    columns: { control: false, description: 'TanStack `ColumnDef[]`; set via a fixture in each story.' },
    data: { control: false, description: 'Row data; set via a fixture in each story.' },
    pagination: boolArg(),
    loading: boolArg(),
    hideFilter: boolArg(),
    hidePagination: boolArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(DataTableDefaultStory, DataTableDefaultSource),

  // Core sub-flows: paginate to the second page, then global-filter to one row.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Pagination: 12 rows / 10 per page, so the last rows live on page 2.
    await expect(canvas.queryByText('laura@example.com')).not.toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))
    await waitFor(() => expect(canvas.getByText('laura@example.com')).toBeInTheDocument())

    // Filter: the global search narrows to the matching row (and resets the page).
    const search = canvas.getByPlaceholderText('Quick search...')
    await userEvent.type(search, 'alice')
    await waitFor(() => expect(canvas.getByText('alice@example.com')).toBeInTheDocument())
    await expect(canvas.queryByText('bob@example.com')).not.toBeInTheDocument()
  },
}

export const Loading: Story = {
  args: { loading: true },
  ...renderRaw(DataTableDefaultStory, DataTableDefaultSource),
}

export const Empty: Story = {
  ...renderRaw(DataTableEmptyStory, DataTableEmptySource, {
    description: 'With no rows the table renders its "No results" empty state.',
  }),
}

export const WithoutToolbar: Story = {
  args: { hideFilter: true, hidePagination: true },
  ...renderRaw(DataTableDefaultStory, DataTableDefaultSource, {
    description: 'Hide the built-in filter and pagination toolbars with `hideFilter` / `hidePagination`.',
  }),
}

export const Demo: Story = {
  ...renderRaw(DataTableDemoStory, DataTableDemoSource),
}
