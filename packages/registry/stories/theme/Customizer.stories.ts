import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Customizer from './Customizer.vue'

/*
  The theme customizer (Phase 2): base color / theme / radius pickers driving a
  live component preview. Preset code is shown read-only; copy / load / shuffle
  export lands in Phase 3.
*/
const meta = {
  title: 'Theme/Create',
  component: Customizer,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    initialConfig: { table: { disable: true } },
  },
} satisfies Meta<typeof Customizer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
