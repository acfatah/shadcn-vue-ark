<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, h } from 'vue'
import type { size as ButtonSize } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  size?: keyof typeof ButtonSize | null
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
}>()

const isIconSize = computed(
  () => ['icon', 'icon-sm', 'icon-lg'].includes(props.size || ''),
)
</script>

<template>
  <Input.Button v-bind="props">
    <Icon v-if="isIconSize" icon="lucide:check" />

    <template v-else>
      Button
    </template>
  </Input.Button>
</template>
