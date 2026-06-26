import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Accordion } from '@/components/ui/accordion'
import { registryItem } from '@/components/ui/accordion/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import AccordionDefault from './AccordionDefaultStory.vue'
import AccordionDefaultSource from './AccordionDefaultStory.vue?raw'

const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/UI/Accordion',
  component: docsRoot(Accordion.Root, 'Accordion.Root'),
  subcomponents: {
    'Accordion.Item': Accordion.Item,
    'Accordion.Trigger': Accordion.Trigger,
    'Accordion.Content': Accordion.Content,
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
        code: AccordionDefaultSource,
      },
    },
  },

  render: args => ({
    components: { AccordionDefault },

    setup() {
      return { args }
    },

    template: html`
      <AccordionDefault v-bind="args" />
    `,
  }),
}
