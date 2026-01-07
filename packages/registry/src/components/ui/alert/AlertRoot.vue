<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'
import type { AlertVariants } from '.'
import { alertVariants } from '.'

interface Props extends PolymorphicProps {
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
