import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Sheet } from '@/components/ui/sheet'
import { registryItem } from '@/components/ui/sheet/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import SheetDefaultStory from './SheetDefaultStory.vue'
import SheetDefaultSource from './SheetDefaultStory.vue?raw'

const meta: Meta<typeof Sheet.Root> = {
  title: 'Components/UI/Sheet',
  component: docsRoot(Sheet.Root, 'Sheet.Root'),
  subcomponents: {
    'Sheet.Trigger': Sheet.Trigger,
    'Sheet.Content': Sheet.Content,
    'Sheet.Overlay': Sheet.Overlay,
    'Sheet.Header': Sheet.Header,
    'Sheet.Footer': Sheet.Footer,
    'Sheet.Title': Sheet.Title,
    'Sheet.Description': Sheet.Description,
    'Sheet.Close': Sheet.Close,
  },
  tags: ['autodocs'],

  parameters: {
    docs: {
      height: '300px',
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
        code: SheetDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SheetDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SheetDefaultStory v-bind="args" />
    `,
  }),
}
