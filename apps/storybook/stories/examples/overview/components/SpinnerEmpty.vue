<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
</script>

<template>
  <Empty.Root
    class="
      w-full border
      md:p-6
    "
  >
    <Empty.Header>
      <Empty.Media variant="icon">
        <Spinner />
      </Empty.Media>
      <Empty.Title>Processing your request</Empty.Title>
      <Empty.Description>
        Please wait while we process your request. Do not refresh the page.
      </Empty.Description>
    </Empty.Header>
    <Empty.Content>
      <Button variant="outline" size="sm">
        Cancel
      </Button>
    </Empty.Content>
  </Empty.Root>
</template>
