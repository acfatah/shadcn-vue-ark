<script setup lang="ts">
import type { FieldsetLegendProps } from '@ark-ui/vue/fieldset'
import type { HTMLAttributes } from 'vue'

import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = FieldsetLegendProps & {
  class?: HTMLAttributes['class']
  variant?: 'legend' | 'label'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'legend',
})

const delegatedProps = reactiveOmit(props, ['class', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Fieldset.Legend
    v-bind="forwardedProps"
    :data-variant="props.variant"
    :class="cn(
      `
        mb-3 font-medium
        data-[variant=label]:text-sm
        data-[variant=legend]:text-base
      `,
      props.class,
    )"
  >
    <slot />
  </Fieldset.Legend>
</template>
