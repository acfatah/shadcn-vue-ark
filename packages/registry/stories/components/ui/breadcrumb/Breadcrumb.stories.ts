import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { registryItem } from '@/components/ui/breadcrumb/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import BreadcrumbDefaultStory from './BreadcrumbDefaultStory.vue'
import BreadcrumbDefaultSource from './BreadcrumbDefaultStory.vue?raw'

const meta: Meta<typeof Breadcrumb.Root> = {
  title: 'Components/UI/Breadcrumb',
  component: docsRoot(Breadcrumb.Root, 'Breadcrumb.Root'),
  subcomponents: {
    'Breadcrumb.List': Breadcrumb.List,
    'Breadcrumb.Item': Breadcrumb.Item,
    'Breadcrumb.Link': Breadcrumb.Link,
    'Breadcrumb.Page': Breadcrumb.Page,
    'Breadcrumb.Separator': Breadcrumb.Separator,
    'Breadcrumb.Ellipsis': Breadcrumb.Ellipsis,
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
