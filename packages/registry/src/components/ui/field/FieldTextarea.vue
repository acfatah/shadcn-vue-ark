<script setup lang="ts">
import type { FieldTextareaProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'
import { Field } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = FieldTextareaProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  'update:modelValue': [value: FieldTextareaProps['modelValue']]
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Field.Textarea
    v-bind="forwardedProps"
    :class="cn(
      `
        flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3
        py-2 text-base shadow-xs transition-[color,box-shadow] outline-none
        placeholder:text-muted-foreground
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
        disabled:cursor-not-allowed disabled:opacity-50
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        md:text-sm
        dark:bg-input/30 dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  />
</template>
