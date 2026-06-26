import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Slider } from '@/components/ui/slider'
import { registryItem } from '@/components/ui/slider/_registry'

import SliderDefaultStory from './SliderDefaultStory.vue'
import SliderDefaultSource from './SliderDefaultStory.vue?raw'

const meta: Meta<typeof Slider> = {
  title: 'Components/UI/Slider',
  component: Slider,
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
