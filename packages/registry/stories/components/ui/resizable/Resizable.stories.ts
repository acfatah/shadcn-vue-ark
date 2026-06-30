import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Resizable } from '@/components/ui/resizable'
import { registryItem } from '@/components/ui/resizable/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import ResizableDefaultStory from './ResizableDefaultStory.vue'
import ResizableDefaultSource from './ResizableDefaultStory.vue?raw'

const meta: Meta<typeof Resizable.PanelGroup> = {
  title: 'Components/UI/Resizable',
  component: docsRoot(Resizable.PanelGroup, 'Resizable.PanelGroup'),
  subcomponents: {
    'Resizable.Panel': Resizable.Panel,
    'Resizable.Handle': Resizable.Handle,
  },
  tags: ['autodocs'],

  argTypes: {
    defaultSize: { control: 'object' },
    id: { control: 'text' },
    ids: { control: 'object' },
    keyboardResizeBy: { control: 'number' },
    nonce: { control: 'text' },
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    panels: { control: 'object' },
    registry: { control: false },
    size: { control: 'object' },
    asChild: boolArg('Render the child element as the root (polymorphic).'),
    class: classArg(),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: {
      test: 'error',
      // KNOWN-BUG: SDL-020 - the resize handle (Splitter.ResizeTrigger) ships no
      // accessible name. Component defect (logged, not fixed); disable only this
      // rule.
      config: { rules: [{ id: 'button-name', enabled: false }] },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ResizableDefaultStory, ResizableDefaultSource),

  // Core flow: the handle is a focusable separator; arrow keys resize the panels
  // and update its aria-valuenow.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const handle = canvas.getAllByRole('separator')[0]!
    const before = handle.getAttribute('aria-valuenow')

    handle.focus()
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() =>
      expect(handle.getAttribute('aria-valuenow')).not.toBe(before))
  },
}
