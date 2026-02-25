<script setup lang="ts">
import type { FieldsetRootProps } from '@ark-ui/vue/fieldset'
import type { HTMLAttributes } from 'vue'

import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

type Props = FieldsetRootProps & {
  class?: HTMLAttributes['class']
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Fieldset.Root
    data-scope="fieldset"
    data-part="root"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex gap-6
        has-[>[data-part=checkbox-group]]:gap-3
        has-[>[data-part=radio-group]]:gap-3
        ${props.orientation === 'horizontal' ? 'flex-row justify-between' : 'flex-col'}
      `,
      props.class,
    )"
  >
    <slot />
  </Fieldset.Root>
</template>
