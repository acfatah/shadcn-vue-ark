<script setup lang="ts">
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
</script>

<template>
  <Dialog.Root>
    <form>
      <Dialog.Trigger as-child>
        <Input.Button variant="outline">
          Open Dialog
        </Input.Button>
      </Dialog.Trigger>

      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're
            done.
          </Dialog.Description>
        </Dialog.Header>

        <div class="grid gap-4">
          <div class="grid gap-3">
            <Input.Label for="name-1">
              Name
            </Input.Label>
            <Input.Text id="name-1" name="name" default-value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Input.Label for="username-1">
              Username
            </Input.Label>
            <Input.Text id="username-1" name="username" default-value="@peduarte" />
          </div>
        </div>

        <Dialog.Footer>
          <Dialog.Close as-child>
            <Input.Reset variant="outline">
              Cancel
            </Input.Reset>
          </Dialog.Close>
          <Input.Submit>
            Save changes
          </Input.Submit>
        </Dialog.Footer>
      </Dialog.Content>
    </form>
  </Dialog.Root>
</template>
