import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { NavigationMenu } from '@/components/ui/navigation-menu'
import { registryItem } from '@/components/ui/navigation-menu/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { docsRoot } from '../../../_helpers/docs-root'
import { renderRaw } from '../../../_helpers/render'
import NavigationMenuDefaultStory from './NavigationMenuDefaultStory.vue'
import NavigationMenuDefaultSource from './NavigationMenuDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/NavigationMenu',
  component: docsRoot(NavigationMenu.Root, 'NavigationMenu.Root'),
  subcomponents: {
    'NavigationMenu.List': NavigationMenu.List,
    'NavigationMenu.Item': NavigationMenu.Item,
    'NavigationMenu.Trigger': NavigationMenu.Trigger,
    'NavigationMenu.Content': NavigationMenu.Content,
    'NavigationMenu.Link': NavigationMenu.Link,
    'NavigationMenu.Indicator': NavigationMenu.Indicator,
    'NavigationMenu.Viewport': NavigationMenu.Viewport,
  },
  tags: ['autodocs'],

  argTypes: {
    closeDelay: { control: 'number' },
    defaultValue: { control: 'text' },
    disableClickTrigger: boolArg('Open only on hover, not click.'),
    disableHoverTrigger: boolArg('Open only on click, not hover.'),
    disablePointerLeaveClose: boolArg('Keep open when the pointer leaves.'),
    id: { control: 'text' },
    ids: { control: 'object' },
    openDelay: { control: 'number' },
    orientation: selectArg(['horizontal', 'vertical'], 'horizontal'),
    translations: { control: 'object' },
    value: { control: 'text' },
    lazyMount: boolArg(),
    unmountOnExit: boolArg(),
    class: classArg(),
    viewport: boolArg('Render item content in a shared floating viewport.'),
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
      story: {
        inline: false,
        height: '40dvh',
      },
    },

    a11y: { test: 'error' },
  },
} satisfies Meta<typeof NavigationMenu.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(NavigationMenuDefaultStory, NavigationMenuDefaultSource),

  // Core flow: clicking a trigger opens its content in the shared viewport
  // (rendered in-flow, so queried via `canvas`), Esc dismisses it. Assert the
  // trigger's data-state, which tracks the open item.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /getting started/i })

    await userEvent.click(trigger)
    await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'open'))
    await expect(canvas.getByText('Introduction')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'closed'))
  },
}

export const Open: Story = {
  args: { defaultValue: 'getting-started' },
  ...renderRaw(NavigationMenuDefaultStory, NavigationMenuDefaultSource, {
    description: 'Render the first item open in docs with `defaultValue`; a11y runs against the open state.',
  }),
}
