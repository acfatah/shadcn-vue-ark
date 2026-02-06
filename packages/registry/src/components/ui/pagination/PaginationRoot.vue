<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from '@ark-ui/vue/pagination'
import type { HTMLAttributes } from 'vue'

import { Pagination } from '@ark-ui/vue/pagination'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import type { ButtonVariants } from '@/components/ui/button'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import { PaginationOptionsProvider } from './context'

interface Props extends PaginationRootProps {
  class?: HTMLAttributes['class']
  itemSize?: ButtonVariants['size']
  controlSize?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  itemSize: 'icon',
  controlSize: 'md',
})
const emit = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, ['class', 'itemSize', 'controlSize'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const options = computed(() => ({
  itemSize: props.itemSize,
  controlSize: props.controlSize,
}))

PaginationOptionsProvider(options)
</script>

<template>
  <Pagination.Root
    v-slot="slotProps"
    data-scope="pagination"
    data-part="root"
    v-bind="forwardedProps"
    :class="cn(
      'mx-auto flex w-full justify-center',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </Pagination.Root>
</template>
