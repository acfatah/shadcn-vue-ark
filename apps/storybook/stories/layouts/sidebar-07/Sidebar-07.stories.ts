import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { vueRouter } from 'storybook-vue3-router'

import registryItem from '@/layouts/sidebar-07/_registry'

import App from '../../../app/src/App.vue'
import routes from './routes'

const meta = {
  title: 'Layouts/sidebar-07',
  tags: ['autodocs'],
  component: App,

  parameters: {
    layout: 'fullscreen',
  },

  decorators: [
    vueRouter(routes),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: registryItem.description,
      },
    },
  },
}
