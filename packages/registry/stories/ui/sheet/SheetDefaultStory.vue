<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet } from '@/components/ui/sheet'
</script>

<template>
  <Sheet.Root>
    <Sheet.Trigger as-child>
      <Input.Button variant="outline">
        Open
      </Input.Button>
    </Sheet.Trigger>
    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>Edit profile</Sheet.Title>
        <Sheet.Description>
          Make changes to your profile here. Click save when you're done.
        </Sheet.Description>
      </Sheet.Header>
      <div class="grid flex-1 auto-rows-min gap-6 px-4">
        <div class="grid gap-3">
          <Label for="sheet-demo-name">Name</Label>
          <Input.Text id="sheet-demo-name" default-value="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="sheet-demo-username">Username</Label>
          <Input.Text id="sheet-demo-username" default-value="@peduarte" />
        </div>
      </div>
      <Sheet.Footer>
        <Input.Button type="submit">
          Save changes
        </Input.Button>
        <Sheet.Close as-child>
          <Input.Button variant="outline">
            Close
          </Input.Button>
        </Sheet.Close>
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>
</template>
