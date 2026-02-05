<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Separator
    data-scope="command"
    data-part="separator"
    v-bind="delegatedProps"
    :class="cn(
      '-mx-1 h-px bg-border',
      props.class,
    )"
  />
</template>
