import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Component } from 'vue'

import { expect, screen, userEvent, within } from 'storybook/test'

import { Toaster } from '@/components/ui/sonner'
import { registryItem } from '@/components/ui/sonner/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import SonnerDefaultStory from './SonnerDefaultStory.vue'
import SonnerDefaultSource from './SonnerDefaultStory.vue?raw'
import SonnerRichStory from './SonnerRichStory.vue'
import SonnerRichSource from './SonnerRichStory.vue?raw'
import SonnerVariantsStory from './SonnerVariantsStory.vue'
import SonnerVariantsSource from './SonnerVariantsStory.vue?raw'

/**
 * Sonner needs the `Toaster` host mounted alongside the trigger story (toasts
 * are fired imperatively and teleported), so it cannot use the single-component
 * `renderRaw`. This local render mounts both and pins the trigger `?raw` source.
 */
function renderToaster(component: Component, source: string, description?: string) {
  return {
    parameters: {
      docs: {
        source: { code: source },
        ...(description ? { description: { story: description } } : {}),
      },
    },

    render: (args: Record<string, unknown>) => ({
      components: { Story: component, Toaster },

      setup() {
        return { args }
      },

      template: `<Teleport to="body"><Toaster v-bind="args" /></Teleport><Story />`,
    }),
  }
}

const meta = {
  title: 'Components/UI/Sonner',
  component: Toaster,
  tags: ['autodocs'],

  argTypes: {
    id: { control: 'text' },
    invert: boolArg(),
    theme: selectArg(['light', 'dark', 'system'], 'light'),
    position: selectArg(
      ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      'bottom-right',
    ),
    closeButtonPosition: { control: 'text' },
    hotkey: { control: 'object' },
    richColors: boolArg(),
    expand: boolArg('Expand toasts instead of stacking them.'),
    duration: { control: 'number' },
    gap: { control: 'number' },
    visibleToasts: { control: 'number' },
    closeButton: boolArg('Render a close button on each toast.'),
    toastOptions: { control: 'object' },
    class: classArg(),
    offset: { control: 'text' },
    mobileOffset: { control: 'text' },
    dir: selectArg(['ltr', 'rtl', 'auto'], 'ltr'),
    swipeDirections: { control: 'object' },
    icons: { control: 'object' },
    containerAriaLabel: { control: 'text' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderToaster(SonnerDefaultStory, SonnerDefaultSource),

  // Core flow: clicking the trigger fires a toast that teleports to the body
  // (queried via `screen`). Assert appearance (toasts are time-based), not
  // disappearance.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: /show toast/i }))
    expect(await screen.findByText('Event has been created')).toBeInTheDocument()
  },
}

export const Variants: Story = {
  ...renderToaster(
    SonnerVariantsStory,
    SonnerVariantsSource,
    'Trigger the success, info, warning, and error toast variants.',
  ),
}

export const RichToast: Story = {
  ...renderToaster(
    SonnerRichStory,
    SonnerRichSource,
    'A toast with title, description, action button, and cancel button.',
  ),
}
