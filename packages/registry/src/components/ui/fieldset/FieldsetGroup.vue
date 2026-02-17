<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Fieldset.Root
    v-bind="forwardedProps"
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
  </Fieldset.Root>
</template>
