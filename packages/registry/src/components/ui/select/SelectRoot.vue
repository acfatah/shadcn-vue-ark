<script setup lang="ts">
import type {
  CollectionItem,
  SelectRootEmits,
  SelectRootProps,
} from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SelectRootProps<CollectionItem> {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<SelectRootEmits<CollectionItem>>()
const delegatedProps = reactiveOmit(props, 'class', 'collection')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Select.Root
    v-bind="forwardedProps"
    :collection="props.collection"
    :class="cn(
      `
        group/select-control flex w-full flex-col gap-3
        *:w-full
        data-[invalid=true]:text-destructive
        [&>.sr-only]:w-auto
      `,
      props.class,
    )"
  >
    <slot />
  </Select.Root>
</template>
