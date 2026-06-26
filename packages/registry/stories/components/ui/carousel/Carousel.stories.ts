import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { Carousel } from '@/components/ui/carousel'
import { registryItem } from '@/components/ui/carousel/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import CarouselDefaultStory from './CarouselDefaultStory.vue'
import CarouselDefaultSource from './CarouselDefaultStory.vue?raw'

const meta: Meta<typeof Carousel.Root> = {
  title: 'Components/UI/Carousel',
  component: docsRoot(Carousel.Root, 'Carousel.Root'),
  subcomponents: {
    'Carousel.Content': Carousel.Content,
    'Carousel.Item': Carousel.Item,
    'Carousel.Previous': Carousel.Previous,
    'Carousel.Next': Carousel.Next,
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
        code: CarouselDefaultSource,
      },
    },
  },

  render: args => ({
    components: { CarouselDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <div class="flex justify-center w-full">
        <CarouselDefaultStory v-bind="args" />
      </div>
    `,
  }),
}
