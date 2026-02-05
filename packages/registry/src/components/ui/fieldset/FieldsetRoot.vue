<script setup lang="ts">
import type { FieldsetRootProps } from '@ark-ui/vue/fieldset'
import type { HTMLAttributes } from 'vue'

import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = FieldsetRootProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
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
        flex flex-col gap-6
        has-[>[data-part=checkbox-group]]:gap-3
        has-[>[data-part=radio-group]]:gap-3
      `,
      props.class,
    )"
  >
    <slot />
  </Fieldset.Root>
</template>
