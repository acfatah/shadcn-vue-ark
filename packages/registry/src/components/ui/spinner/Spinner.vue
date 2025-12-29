<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  icon?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'lucide:loader-circle',
})

const delegatedProps = reactiveOmit(props, ['class', 'icon'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Icon
    v-bind="forwardedProps"
    data-scope="spinner"
    :icon="props.icon"
    role="status"
    aria-label="Loading"
    :class="cn('animate-spin', props.class)"
  />
</template>
