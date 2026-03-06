<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    v-bind="delegatedProps"
    :class="cn(
      `
        group/field-group @container/field-group flex w-full flex-col gap-4
        data-[slot=checkbox-group]:gap-3
        *:data-[slot=field-group]:gap-4
      `,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
