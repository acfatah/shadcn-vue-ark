<script setup lang="ts">
import type { CheckboxRootProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'

import { useFieldContext } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { Checkbox } from '@/components/ui/checkbox'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

type Props = CheckboxRootProps & {
  class?: HTMLAttributes['class']
  disabled?: boolean
  invalid?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  'update:checked': [value: CheckboxRootProps['checked']]
}>()
const fieldContext = useFieldContext()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
const disabled = computed(() => fieldContext.value.disabled || props.disabled)
const invalid = computed(() => fieldContext.value.invalid || props.invalid)
</script>

<template>
  <Checkbox.Root
    v-bind="forwardedProps"
    :disabled="disabled"
    :invalid="invalid"
    :class="props.class"
  >
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Content>
      <slot />
    </Checkbox.Content>
  </Checkbox.Root>
</template>
