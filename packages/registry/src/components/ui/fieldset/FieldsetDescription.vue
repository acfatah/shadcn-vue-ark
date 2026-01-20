<script setup lang="ts">
import type { FieldsetHelperTextProps } from '@ark-ui/vue/fieldset'
import type { HTMLAttributes } from 'vue'

import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = FieldsetHelperTextProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Fieldset.HelperText
    v-bind="forwardedProps"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </Fieldset.HelperText>
</template>
