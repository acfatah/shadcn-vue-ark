import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { html } from 'common-tags'

import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { registryItem } from '@/components/ui/accordion/_registry'

import AccordionDefault from './AccordionDefault.vue'
import AccordionDefaultSource from './AccordionDefault.vue?raw'

const meta = {
  title: 'Components/Accordion',
  subcomponents: {
    AccordionItem,
    AccordionRoot,
    AccordionTrigger,
    AccordionContent,
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof AccordionRoot>

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
