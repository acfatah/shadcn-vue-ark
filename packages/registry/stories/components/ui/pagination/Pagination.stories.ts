import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Pagination } from '@/components/ui/pagination'
import { registryItem } from '@/components/ui/pagination/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import DataTableFooterStory from './DataTableFooterStory.vue'
import DataTableFooterSource from './DataTableFooterStory.vue?raw'
import IconsOnlyStory from './IconsOnlyStory.vue'
import IconsOnlySource from './IconsOnlyStory.vue?raw'
import PaginationDefaultStory from './PaginationDefaultStory.vue'
import PaginationDefaultSource from './PaginationDefaultStory.vue?raw'

const meta: Meta<typeof Pagination.Root> = {
  title: 'Components/UI/Pagination',
  component: docsRoot(Pagination.Root, 'Pagination.Root'),
  subcomponents: {
    'Pagination.Content': Pagination.Content,
    'Pagination.Item': Pagination.Item,
    'Pagination.Ellipsis': Pagination.Ellipsis,
    'Pagination.Previous': Pagination.Previous,
    'Pagination.Next': Pagination.Next,
    'Pagination.First': Pagination.First,
    'Pagination.Last': Pagination.Last,
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
        code: PaginationDefaultSource,
      },
    },
  },

  render: args => ({
    components: { PaginationDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <PaginationDefaultStory v-bind="args" />
    `,
  }),
}

export const IconsOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: IconsOnlySource,
      },
    },
  },

  render: args => ({
    components: { IconsOnlyStory },

    setup() {
      return { args }
    },

    template: html`
      <IconsOnlyStory v-bind="args" />
    `,
  }),
}

export const DataTableFooter: Story = {
  name: 'Data Table Footer',

  parameters: {
    docs: {
      source: {
        code: DataTableFooterSource,
      },
    },
  },

  render: args => ({
    components: { DataTableFooterStory },

    setup() {
      return { args }
    },

    template: html`
      <DataTableFooterStory v-bind="args" />
    `,
  }),
}
