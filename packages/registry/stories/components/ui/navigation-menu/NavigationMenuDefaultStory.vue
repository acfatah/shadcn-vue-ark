<script setup lang="ts">
import { NavigationMenu, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

interface MenuItem {
  title: string
  href: string
  description: string
}

const menus: MenuItem[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/components/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/components/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/components/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/components/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/components/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/components/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]
</script>

<template>
  <div class="min-h-[50vh]">
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="getting-started">
          <NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul
              class="
                grid gap-3 p-2
                md:w-[400px]
                lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]
              "
            >
              <li class="row-span-3">
                <NavigationMenu.Link as-child>
                  <a
                    class="
                      flex size-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50
                      to-muted p-2 no-underline outline-none select-none
                      focus:shadow-md
                    "
                    href="/"
                  >
                    <img src="https://ark-ui.com/icon.svg" class="size-6">
                    <div class="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p class="text-sm/tight text-muted-foreground">
                      Beautifully designed components built with Ark UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link as-child>
                  <a
                    href="/docs/introduction"
                    class="
                      block space-y-1 rounded-md p-3 leading-none no-underline transition-colors
                      outline-none select-none
                      hover:bg-accent hover:text-accent-foreground
                      focus:bg-accent focus:text-accent-foreground
                    "
                  >
                    <div class="text-sm leading-none font-medium">Introduction</div>
                    <p class="line-clamp-2 text-sm/snug text-muted-foreground">
                      Re-usable components built using Ark UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link as-child>
                  <a
                    href="/docs/installation"
                    class="
                      block space-y-1 rounded-md p-3 leading-none no-underline transition-colors
                      outline-none select-none
                      hover:bg-accent hover:text-accent-foreground
                      focus:bg-accent focus:text-accent-foreground
                    "
                  >
                    <div class="text-sm leading-none font-medium">Installation</div>
                    <p class="line-clamp-2 text-sm/snug text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
              <li>
                <NavigationMenu.Link as-child>
                  <a
                    href="/docs/typography"
                    class="
                      block space-y-1 rounded-md p-3 leading-none no-underline transition-colors
                      outline-none select-none
                      hover:bg-accent hover:text-accent-foreground
                      focus:bg-accent focus:text-accent-foreground
                    "
                  >
                    <div class="text-sm leading-none font-medium">Typography</div>
                    <p class="line-clamp-2 text-sm/snug text-muted-foreground">
                      Styles for headings, paragraphs, lists...etc
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="components">
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul
              class="
                grid w-[400px] gap-3 p-2
                md:w-[500px] md:grid-cols-2
                lg:w-[600px]
              "
            >
              <li v-for="menu in menus" :key="menu.title">
                <NavigationMenu.Link as-child>
                  <a
                    :href="menu.href"
                    class="
                      block space-y-1 rounded-md p-3 leading-none no-underline transition-colors
                      outline-none select-none
                      hover:bg-accent hover:text-accent-foreground
                      focus:bg-accent focus:text-accent-foreground
                    "
                  >
                    <div class="text-sm leading-none font-medium">{{ menu.title }}</div>
                    <p class="line-clamp-2 text-sm/snug text-muted-foreground">
                      {{ menu.description }}
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="/docs/introduction" :class="navigationMenuTriggerStyle()">
            Documentation
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
</template>
