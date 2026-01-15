<script setup lang="ts">
import { CloudIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'
</script>

<template>
  <Empty.Root class="m-4 min-h-[calc(100dvh-2rem)] border border-dashed p-4">
    <Empty.Header>
      <Empty.Media variant="icon">
        <CloudIcon data-part="icon" />
      </Empty.Media>

      <Empty.Title>Cloud Storage Empty</Empty.Title>
      <Empty.Description>
        Upload files to your cloud storage to access them anywhere.
      </Empty.Description>
    </Empty.Header>

    <Empty.Content>
      <Button variant="outline" size="sm">
        Upload Files
      </Button>
    </Empty.Content>
  </Empty.Root>
</template>
