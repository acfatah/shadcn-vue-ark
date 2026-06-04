import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { registryItem } from '@/components/ui/breadcrumb/_registry'

import BreadcrumbDefaultStory from './BreadcrumbDefaultStory.vue'
import BreadcrumbDefaultSource from './BreadcrumbDefaultStory.vue?raw'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: BreadcrumbDefaultSource,
      },
    },
  },

  render: args => ({
    components: { BreadcrumbDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <BreadcrumbDefaultStory v-bind="args" />
    `,
  }),
}
