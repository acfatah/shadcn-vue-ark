<script setup lang="ts">
import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'
</script>

<template>
  <Empty.Root class="min-h-dvh">
    <Empty.Header>
      <Empty.Media variant="icon">
        <FolderCodeIcon data-part="icon" />
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
        Learn More <ArrowUpRightIcon data-part="icon" />
      </a>
    </Button>
  </Empty.Root>
</template>
