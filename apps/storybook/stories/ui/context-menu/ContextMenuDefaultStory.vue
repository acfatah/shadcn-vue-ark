<script setup lang="ts">
import { Code2Icon, PlusIcon, TrashIcon } from 'lucide-vue-next'

import { ContextMenu } from '@/components/ui/context-menu'
</script>

<template>
  <ContextMenu.Root>
    <ContextMenu.Trigger
      class="
        flex h-[200px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm
      "
    >
      Right click here
    </ContextMenu.Trigger>
    <ContextMenu.Content class="w-52">
      <ContextMenu.Item inset value="back">
        Back
        <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
      </ContextMenu.Item>
      <ContextMenu.Item inset disabled value="forward">
        Forward
        <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
      </ContextMenu.Item>
      <ContextMenu.Item inset value="reload">
        Reload
        <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
      </ContextMenu.Item>
      <ContextMenu.Sub>
        <ContextMenu.SubTrigger inset>
          More Tools
        </ContextMenu.SubTrigger>
        <ContextMenu.SubContent class="w-44">
          <ContextMenu.Item inset value="save-page">
            Save Page...
            <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item value="create-shortcut">
            <PlusIcon />
            Create Shortcut...
          </ContextMenu.Item>
          <ContextMenu.Item inset value="name-window">
            Name Window...
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item value="developer-tools">
            <Code2Icon />
            Developer Tools
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item variant="destructive" value="delete">
            <TrashIcon />
            Delete
          </ContextMenu.Item>
        </ContextMenu.SubContent>
      </ContextMenu.Sub>
      <ContextMenu.Separator />
      <ContextMenu.CheckboxItem :checked="true" value="show-bookmarks">
        Show Bookmarks
        <ContextMenu.Shortcut>⌘⇧B</ContextMenu.Shortcut>
      </ContextMenu.CheckboxItem>
      <ContextMenu.CheckboxItem :checked="false" value="show-full-urls">
        Show Full URLs
      </ContextMenu.CheckboxItem>
      <ContextMenu.Separator />
      <ContextMenu.RadioGroup model-value="pedro">
        <ContextMenu.Label inset>
          People
        </ContextMenu.Label>
        <ContextMenu.RadioItem value="pedro">
          Pedro Duarte
        </ContextMenu.RadioItem>
        <ContextMenu.RadioItem value="colm">
          Colm Tuite
        </ContextMenu.RadioItem>
      </ContextMenu.RadioGroup>
    </ContextMenu.Content>
  </ContextMenu.Root>
</template>
