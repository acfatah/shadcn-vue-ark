<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
</script>

<template>
  <Dialog.Root role="alertdialog">
    <Dialog.Trigger as-child>
      <Button variant="destructive">
        Delete account
      </Button>
    </Dialog.Trigger>

    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This permanently deletes your account and removes your data from
          our servers. This action cannot be undone.
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Dialog.Close as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </Dialog.Close>
        <Button variant="destructive">
          Delete
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</template>
