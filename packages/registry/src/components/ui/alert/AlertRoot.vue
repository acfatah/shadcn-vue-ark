<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AlertRootProps, AlertVariants } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

import { alertVariants } from './variant'

interface Props extends AlertRootProps {
  class?: HTMLAttributes['class']
  variant?: AlertVariants['variant']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class', 'variant')
</script>

<template>
  <ark.div
    data-scope="alert"
    data-part="root"
    v-bind="delegatedProps"
    :class="cn(
      alertVariants({ variant }),
      props.class,
    )"
    role="alert"
  >
    <slot />
  </ark.div>
</template>
