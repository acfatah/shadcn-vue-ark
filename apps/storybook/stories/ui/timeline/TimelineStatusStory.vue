<script setup lang="ts">
import type { TimelineOrientation } from '@/components/ui/timeline/context'
import type { TimelineStatus } from '@/components/ui/timeline/TimelineItem.vue'

import { Timeline } from '@/components/ui/timeline'

const props = defineProps<{
  orientation?: TimelineOrientation
  reversed?: boolean
}>()

const items: { title: string, description: string, status: TimelineStatus }[] = [
  {
    title: 'Research',
    description: 'Gathered requirements and explored existing solutions.',
    status: 'complete',
  },
  {
    title: 'Design',
    description: 'Created wireframes and design mockups.',
    status: 'complete',
  },
  {
    title: 'Development',
    description: 'Building out the core features.',
    status: 'current',
  },
  {
    title: 'Release',
    description: 'Deploy to production.',
    status: 'incomplete',
  },
]
</script>

<template>
  <Timeline.Root v-bind="props">
    <Timeline.Item
      v-for="(item, index) in items"
      :key="index"
      :status="item.status"
    >
      <Timeline.Connector>
        <Timeline.Indicator />
        <Timeline.Separator />
      </Timeline.Connector>
      <Timeline.Content>
        <Timeline.Title>{{ item.title }}</Timeline.Title>
        <Timeline.Description>{{ item.description }}</Timeline.Description>
      </Timeline.Content>
    </Timeline.Item>
  </Timeline.Root>
</template>
