import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Carousel } from '@/components/ui/carousel'
import { registryItem } from '@/components/ui/carousel/_registry'

import { classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import CarouselDefaultStory from './CarouselDefaultStory.vue'
import CarouselDefaultSource from './CarouselDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/Carousel',
  component: docsRoot(Carousel.Root, 'Carousel.Root'),
  subcomponents: {
    'Carousel.Content': Carousel.Content,
    'Carousel.Item': Carousel.Item,
    'Carousel.Previous': Carousel.Previous,
    'Carousel.Next': Carousel.Next,
  },
  tags: ['autodocs'],

  argTypes: {
    opts: { control: 'object' },
    plugins: { control: 'object' },
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
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
} satisfies Meta<typeof Carousel.Root>

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

  // Core flow: Previous is disabled on the first slide; clicking Next advances
  // the carousel and enables it.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const prev = canvas.getByRole('button', { name: /previous slide/i })

    await expect(prev).toBeDisabled()
    await userEvent.click(canvas.getByRole('button', { name: /next slide/i }))
    await waitFor(() => expect(prev).toBeEnabled())
  },
}
