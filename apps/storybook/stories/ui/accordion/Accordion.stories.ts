import type { StoryObj } from '@storybook/vue3-vite'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'

import AccordionDefault from './AccordionDefault.vue'
import AccordionDefaultSource from './AccordionDefault.vue?raw'

export default {
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
        component: Accordion.description,
      },
    },
  },
}

export const Default: StoryObj = {
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

    template: `
      <AccordionDefault v-bind="args" />
    `,
  }),
}
