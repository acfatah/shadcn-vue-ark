import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from '@/components/ui/card'

import type { BaseColorName, RadiusName, ThemeName } from './lib/config'

import { BASE_COLOR_NAMES, RADII, THEME_NAMES } from './lib/config'
import PreviewRoot from './PreviewRoot.vue'

interface PreviewArgs {
  baseColor: BaseColorName
  theme: ThemeName
  radius: RadiusName
  dark: boolean
}

/*
  Manual harness for the Phase 1 live-preview engine. Change the controls and
  watch the demo components re-theme without affecting the Storybook chrome. The
  real customizer UI (pickers + export) arrives in Phase 2/3.
*/
const meta = {
  title: 'Theme/PreviewRoot',
  parameters: { layout: 'centered' },
  argTypes: {
    baseColor: { control: 'select', options: [...BASE_COLOR_NAMES] },
    theme: { control: 'select', options: [...THEME_NAMES] },
    radius: { control: 'select', options: RADII.map(radius => radius.name) },
    dark: { control: 'boolean' },
  },
  args: {
    baseColor: 'neutral',
    theme: 'blue',
    radius: 'medium',
    dark: false,
  },
} satisfies Meta<PreviewArgs>

export default meta

type Story = StoryObj<PreviewArgs>

export const Default: Story = {
  render: args => ({
    components: {
      PreviewRoot,
      Button,
      Badge,
      CardRoot,
      CardHeader,
      CardTitle,
      CardDescription,
      CardContent,
    },
    setup() {
      return { args }
    },
    template: `
      <PreviewRoot
        :config="{ baseColor: args.baseColor, theme: args.theme, radius: args.radius }"
        :dark="args.dark"
        class="rounded-xl border p-8"
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <CardRoot class="w-72">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Themed surface preview.</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Colors and radius update live from the controls.
              </p>
            </CardContent>
          </CardRoot>
        </div>
      </PreviewRoot>
    `,
  }),
}
