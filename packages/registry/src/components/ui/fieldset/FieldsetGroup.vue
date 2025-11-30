<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Fieldset.Root
    v-bind="forwardedProps"
    :class="cn(
      `
        group/field-group @container/field-group flex w-full flex-col gap-7
        data-[slot=checkbox-group]:gap-3
        *:data-[slot=field-group]:gap-4
      `,
      props.class,
    )"
  >
    <slot />
  </Fieldset.Root>
</template>
