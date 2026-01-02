<script setup lang="ts">
import type {
  CollectionItem,
  SelectRootEmits,
  SelectRootProps,
} from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'
import { SelectProvider, useSelect } from '.'

export interface Props extends SelectRootProps<CollectionItem> {
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<SelectRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, [
  'class',
  'collection',
  'disabled',
  'invalid',
])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
const disabled = computed(() => (props.loading || props.disabled) || undefined)

const select = useSelect<CollectionItem>({
  ...(forwardedProps as unknown as Record<string, any>),
  collection: props.collection,
  disabled: disabled.value,
})
SelectProvider(select)
</script>

<template>
  <Select.Root
    v-bind="forwardedProps"
    :collection="props.collection"
    :disabled="disabled"
    :invalid="props.invalid || select.nativeInvalid"
    :class="cn(
      `
        group/select-control flex w-full flex-col gap-3
        *:w-full
        [&>.sr-only]:w-auto
      `,
      props.class,
    )"
  >
    <slot />
  </Select.Root>
</template>
