<script setup lang="ts">
import type { FieldRootProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'

import { Field } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

type Props = FieldRootProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Field.Root
    v-bind="forwardedProps"
    :class="cn(
      `
        group/field flex w-full flex-col gap-3
        data-[invalid=true]:text-destructive
      `,
      // Handle flex direction for checkbox inputs
      `has-data-[scope=checkbox-input]:flex-row has-data-[scope=checkbox-input]:flex-wrap`,
      `
        has-data-[scope=checkbox-input]:**:data-[part=description]:flex-inline
        has-data-[scope=checkbox-input]:**:data-[part=description]:w-full
      `,
      // Handle flex direction for radio inputs
      `has-data-[scope=radio-input]:flex-row has-data-[scope=radio-input]:flex-wrap`,
      `
        has-data-[scope=radio-input]:**:data-[part=description]:flex-inline
        has-data-[scope=radio-input]:**:data-[part=description]:w-full
      `,
      props.class,
    )"
  >
    <slot />
  </Field.Root>
</template>
