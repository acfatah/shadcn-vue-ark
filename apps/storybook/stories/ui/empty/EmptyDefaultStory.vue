<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'
</script>

<template>
  <Empty.Root class="min-h-dvh">
    <Empty.Header>
      <Empty.Media variant="icon">
        <Icon icon="lucide:folder-code" />
      </Empty.Media>
      <Empty.Title>No Projects Yet</Empty.Title>
      <Empty.Description>
        You haven't created any projects yet. Get started by creating your first
        project.
      </Empty.Description>
    </Empty.Header>

    <Empty.Content>
      <div class="flex gap-2">
        <Button>Create Project</Button>
        <Button variant="outline">
          Import Project
        </Button>
      </div>
    </Empty.Content>

    <Button variant="link" as-child class="text-muted-foreground" size="sm">
      <a href="#">
        Learn More <Icon icon="lucide:arrow-up-right" />
      </a>
    </Button>
  </Empty.Root>
</template>
