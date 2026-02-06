import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Slider } from '@/components/ui/slider'
import { registryItem } from '@/components/ui/slider/_registry'

import SliderDefaultStory from './SliderDefaultStory.vue'
import SliderDefaultSource from './SliderDefaultStory.vue?raw'

const meta = {
  title: 'Components/Slider',
  component: Slider.Root,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof Slider.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: SliderDefaultSource,
      },
    },
  },

  render: args => ({
    components: { SliderDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <SliderDefaultStory v-bind="args" />
    `,
  }),
}
