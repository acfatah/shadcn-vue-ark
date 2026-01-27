<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
</script>

<template>
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">
          Home
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger class="flex items-center gap-1">
            <Ellipsis class="size-4" />
            <span class="sr-only">Toggle menu</span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Item value="document">
              Documentation
            </DropdownMenu.Item>
            <DropdownMenu.Item value="themes">
              Themes
            </DropdownMenu.Item>
            <DropdownMenu.Item value="github">
              GitHub
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/docs/components">
          Components
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
</template>
