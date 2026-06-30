import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { registryItem } from '@/components/ui/breadcrumb/_registry'

import { classArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import BreadcrumbDefaultStory from './BreadcrumbDefaultStory.vue'
import BreadcrumbDefaultSource from './BreadcrumbDefaultStory.vue?raw'
import BreadcrumbDemoStory from './BreadcrumbDemoStory.vue'
import BreadcrumbDemoSource from './BreadcrumbDemoStory.vue?raw'

const meta = {
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
} satisfies Meta<typeof Breadcrumb.Root>

export default meta
type Story = StoryObj<typeof meta>

// Non-interactive navigation, so no play; matrix + a11y only.
export const Default: Story = {
  ...renderRaw(BreadcrumbDefaultStory, BreadcrumbDefaultSource),
}

export const Demo: Story = {
  ...renderRaw(BreadcrumbDemoStory, BreadcrumbDemoSource, {
    description: 'Collapse middle items behind a dropdown menu.',
  }),
}
