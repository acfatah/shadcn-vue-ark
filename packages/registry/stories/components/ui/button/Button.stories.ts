import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Button } from '@/components/ui/button'
import { registryItem } from '@/components/ui/button/_registry'

import { boolArg, classArg, selectArg } from '../../../_helpers/args'
import { renderRaw } from '../../../_helpers/render'
import AsChildStory from './AsChildStory.vue'
import AsChildSource from './AsChildStory.vue?raw'
import ButtonDefaultStory from './ButtonDefaultStory.vue'
import ButtonDefaultSource from './ButtonDefaultStory.vue?raw'
import DemoStory from './DemoStory.vue'
import DemoSource from './DemoStory.vue?raw'
import RoundedStory from './RoundedStory.vue'
import RoundedSource from './RoundedStory.vue?raw'
import SizeStory from './SizeStory.vue'
import SizeSource from './SizeStory.vue?raw'
import SpinnerStory from './SpinnerStory.vue'
import SpinnerSource from './SpinnerStory.vue?raw'
import VariantStory from './VariantStory.vue'
import VariantSource from './VariantStory.vue?raw'
import WithIconStory from './WithIconStory.vue'
import WithIconSource from './WithIconStory.vue?raw'

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],

  // Note: asChild is intentionally not defaulted here - a meta-level
  // `asChild: false` falls through and overrides the AsChild story's hardcoded
  // `as-child`, producing a nested <button><a> (nested-interactive a11y error).
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    loading: false,
  },

  argTypes: {
    variant: selectArg(
      ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      'default',
    ),
    size: selectArg(
      ['xs', 'sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      'md',
    ),
    disabled: boolArg(),
    loading: boolArg('Disables the button and marks it busy.'),
    asChild: boolArg('Render the child element as the button (polymorphic).'),
    scope: { control: 'text', description: 'The `data-scope` attribute value.' },
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  ...renderRaw(ButtonDefaultStory, ButtonDefaultSource),
}

export const Variants: Story = {
  ...renderRaw(VariantStory, VariantSource, {
    parameters: { controls: { exclude: ['variant'] } },
  }),
}

export const Sizes: Story = {
  ...renderRaw(SizeStory, SizeSource, {
    parameters: { controls: { exclude: ['size'] } },
  }),
}

export const WithIcon: Story = {
  ...renderRaw(WithIconStory, WithIconSource),
}

export const Rounded: Story = {
  ...renderRaw(RoundedStory, RoundedSource),
}

export const Spinner: Story = {
  ...renderRaw(SpinnerStory, SpinnerSource, {
    description: 'Pass `loading` to disable the button and show a spinner.',
  }),
}

export const AsChild: Story = {
  ...renderRaw(AsChildStory, AsChildSource, {
    description: 'Use `asChild` to render a link styled as a button.',
  }),
}

export const Demo: Story = {
  ...renderRaw(DemoStory, DemoSource),
}
