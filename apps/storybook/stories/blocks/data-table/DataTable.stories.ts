import type { Meta, StoryObj } from '@storybook/vue3-vite'

import CustomFilterAndPaginationComponent from '@/blocks/data-table-custom/CustomFilterAndPagination.vue'
import CustomFilterAndPaginationSource from '@/blocks/data-table-custom/CustomFilterAndPagination.vue?raw'
import DefaultStory from '@/blocks/data-table-default/DefaultDataTable.vue'
import DefaultSource from '@/blocks/data-table-default/DefaultDataTable.vue?raw'
import TanStackTableComponent from '@/blocks/tanstack-data-table/TanStackTable.vue'
import TanStackTableSource from '@/blocks/tanstack-data-table/TanStackTable.vue?raw'

interface DataTableStoryArgs {
  hideFilter: boolean
  hidePagination: boolean
}

const meta = {
  title: 'Blocks/Data Table',
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

/**
 * TanStack Table provides more advanced options to build more complex data tables.
 *
 * Documentation: https://www.shadcn-vue.com/docs/components/data-table<br>
 * TanStack Table API: https://tanstack.com/table/v8/docs/introduction
 */
export const TanStackTable: Story = {
  args: {
    hideFilter: false,
    hidePagination: false,
  },
  parameters: {
    docs: {
      source: {
        code: TanStackTableSource,
      },
    },
  },

  render: args => ({
    components: { TanStackTableComponent },

    setup() {
      return { args }
    },

    template: `
      <TanStackTableComponent v-bind="args" />
    `,
  }),
}

TanStackTable.name = 'TanStack Table'

export const CustomFilterAndPagination: Story = {
  args: {
    hideFilter: false,
    hidePagination: false,
  },
  parameters: {
    docs: {
      source: {
        code: CustomFilterAndPaginationSource,
      },
    },
  },

  render: args => ({
    components: { CustomFilterAndPaginationComponent },

    setup() {
      return { args }
    },

    template: `
      <CustomFilterAndPaginationComponent v-bind="args" />
    `,
  }),
}
