<script setup lang="ts">
import { ArrowUpIcon, CheckIcon, InfoIcon, PlusIcon, Search } from 'lucide-vue-next'

import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { InputGroup } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { Tooltip } from '@/components/ui/tooltip'
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <InputGroup.Root>
      <InputGroup.Input placeholder="Search..." />
      <InputGroup.Addon>
        <Search />
      </InputGroup.Addon>
      <InputGroup.Addon align="inline-end">
        12 results
      </InputGroup.Addon>
    </InputGroup.Root>
    <InputGroup.Root>
      <InputGroup.Input placeholder="example.com" class="pl-1!" />
      <InputGroup.Addon>
        <InputGroup.Text>https://</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Addon align="inline-end">
        <Tooltip.Root>
          <Tooltip.Trigger as-child>
            <InputGroup.Button class="rounded-full" size="icon-xs">
              <InfoIcon class="size-4" />
            </InputGroup.Button>
          </Tooltip.Trigger>
          <Tooltip.Content>This is content in a tooltip.</Tooltip.Content>
        </Tooltip.Root>
      </InputGroup.Addon>
    </InputGroup.Root>
    <InputGroup.Root>
      <InputGroup.Textarea placeholder="Ask, Search or Chat..." />
      <InputGroup.Addon align="block-end">
        <InputGroup.Button
          variant="outline"
          class="rounded-full"
          size="icon-xs"
        >
          <PlusIcon class="size-4" />
        </InputGroup.Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger as-child>
            <InputGroup.Button variant="ghost">
              Auto
            </InputGroup.Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            side="top"
            align="start"
            class="[--radius:0.95rem]"
          >
            <DropdownMenu.Item value="auto">
              Auto
            </DropdownMenu.Item>
            <DropdownMenu.Item value="agent">
              Agent
            </DropdownMenu.Item>
            <DropdownMenu.Item value="manual">
              Manual
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <InputGroup.Text class="ml-auto">
          52% used
        </InputGroup.Text>
        <Separator orientation="vertical" class="h-4!" />
        <InputGroup.Button
          variant="default"
          class="rounded-full"
          size="icon-xs"
          disabled
        >
          <ArrowUpIcon class="size-4" />
          <span class="sr-only">Send</span>
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
    <InputGroup.Root>
      <InputGroup.Input placeholder="@shadcn" />
      <InputGroup.Addon align="inline-end">
        <div
          class="
            flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground
          "
        >
          <CheckIcon class="size-3" />
        </div>
      </InputGroup.Addon>
    </InputGroup.Root>
  </div>
</template>
