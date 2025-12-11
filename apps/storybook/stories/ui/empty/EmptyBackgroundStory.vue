<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'
</script>

<template>
  <Empty.Root class="h-full min-h-dvh bg-linear-to-b from-muted/50 from-30% to-background">
    <Empty.Header>
      <Empty.Media variant="icon">
        <Icon icon="lucide:bell" />
      </Empty.Media>
      <Empty.Title>No Notifications</Empty.Title>
      <Empty.Description>
        You're all caught up. New notifications will appear here.
      </Empty.Description>
    </Empty.Header>

    <Empty.Content>
      <Button variant="outline" size="sm">
        <Icon icon="lucide:refresh-ccw" />
        Refresh
      </Button>
    </Empty.Content>
  </Empty.Root>
</template>
