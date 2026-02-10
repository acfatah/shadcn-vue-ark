<script setup lang="ts">
import type { FieldsetErrorTextProps } from '@ark-ui/vue/fieldset'
import type { HTMLAttributes } from 'vue'

import { Fieldset } from '@ark-ui/vue/fieldset'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

type Props = FieldsetErrorTextProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Fieldset.ErrorText
    v-bind="forwardedProps"
    :class="cn('text-sm font-normal text-destructive', props.class)"
  >
    <slot />
  </Fieldset.ErrorText>
</template>
