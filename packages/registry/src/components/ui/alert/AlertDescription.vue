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
    data-scope="alert"
    data-part="description"
    v-bind="delegatedProps"
    :class="cn(
      `
        col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground
        [&_p]:leading-relaxed
      `,
      props.class,

    )"
  >
    <slot />
  </ark.div>
</template>
