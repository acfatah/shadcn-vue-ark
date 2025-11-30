<script setup lang="ts">
import type { FieldHelperTextProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'
import { Field } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = FieldHelperTextProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Field.HelperText
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm leading-normal font-normal text-muted-foreground
        group-has-data-[orientation=horizontal]/field:text-balance
        last:mt-0
        nth-last-2:-mt-1
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
        [[data-variant=legend]+&]:-mt-1.5
      `,
      props.class,
    )"
  >
    <slot />
  </Field.HelperText>
</template>
