<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <nav
    v-bind="forwardedProps"
    aria-label="breadcrumb"
    data-scope="breadcrumb"
    data-part="root"
    :class="props.class"
  >
    <slot />
  </nav>
</template>
