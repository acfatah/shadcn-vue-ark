<script setup lang="ts">
import { RotateCcwIcon } from 'lucide-vue-next'
import { computed } from 'vue'

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
  <Input.Reset v-bind="props">
    <RotateCcwIcon v-if="isIconSize" data-part="icon" />

    <template v-else>
      Reset
    </template>
  </Input.Reset>
</template>
