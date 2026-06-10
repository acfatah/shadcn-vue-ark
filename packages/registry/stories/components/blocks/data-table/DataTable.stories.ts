import type { Meta, StoryObj } from '@storybook/vue3-vite'

import DataTableCustomRegistry from '@/components/blocks/data-table-custom/_registry'
import DataTableCustomComponent from '@/components/blocks/data-table-custom/DataTableCustom.vue'
import DataTableCustomSource from '@/components/blocks/data-table-custom/DataTableCustom.vue?raw'
import DefaultStory from '@/components/blocks/data-table-default/DefaultDataTable.vue'
import DefaultSource from '@/components/blocks/data-table-default/DefaultDataTable.vue?raw'
import TanstackDataTableRegistry from '@/components/blocks/tanstack-data-table/_registry'
import TanstackDataTableComponent from '@/components/blocks/tanstack-data-table/TanstackDataTable.vue'
import TanstackDataTableSource from '@/components/blocks/tanstack-data-table/TanstackDataTable.vue?raw'

interface DataTableStoryArgs {
  hideFilter: boolean
  hidePagination: boolean
}

const meta = {
  title: 'Components/Blocks/Data Table',
  tags: ['autodocs'],
  args: {
    hideFilter: false,
    hidePagination: false,
  },
} satisfies Meta<DataTableStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Minimal reusable DataTable component.
 */
export const Default: Story = {
  args: {
    hideFilter: false,
    hidePagination: false,
  },
  parameters: {
    docs: {
      source: {
        code: DefaultSource,
      },
    },
  },

  render: args => ({
    components: { DefaultStory },

    setup() {
      return { args }
    },

    template: `
      <DefaultStory v-bind="args" />
    `,
  }),
}

export const TanstackDataTable: Story = {
  args: {
    hideFilter: false,
    hidePagination: false,
  },

  parameters: {
    docs: {
      source: {
        code: TanstackDataTableSource,
      },

      description: {
        story: TanstackDataTableRegistry.description,
      },
    },
  },

  render: args => ({
    components: { TanstackDataTableComponent },

    setup() {
      return { args }
    },

    template: `
      <TanstackDataTableComponent v-bind="args" />
    `,
  }),
}

export const DataTableCustom: Story = {
  args: {
    hideFilter: false,
    hidePagination: false,
  },

  parameters: {
    docs: {
      source: {
        code: DataTableCustomSource,
      },

      description: {
        story: DataTableCustomRegistry.description,
      },
    },
  },

  render: args => ({
    components: { DataTableCustomComponent },

    setup() {
      return { args }
    },

    template: `
      <DataTableCustomComponent v-bind="args" />
    `,
  }),
}
