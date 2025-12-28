<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import type { DescriptionProps } from '@/components/ui/description'
import { Description } from '@/components/ui/description'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = defineProps<DescriptionProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Description
    data-scope="radio-group"
    data-part="description"
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm text-muted-foreground
        data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </Description>
</template>
