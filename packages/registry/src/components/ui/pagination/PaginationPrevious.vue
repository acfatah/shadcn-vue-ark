<script setup lang="ts">
import type { PaginationPrevTriggerProps } from '@ark-ui/vue/pagination'
import type { HTMLAttributes } from 'vue'

import { Pagination } from '@ark-ui/vue/pagination'
import { reactiveOmit } from '@vueuse/core'
import { ChevronLeftIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import type { ButtonVariants } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { usePaginationOptions } from './context'

interface Props extends PaginationPrevTriggerProps {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const options = usePaginationOptions(computed(() => ({
  itemSize: 'icon',
  controlSize: 'md',
})))

const resolvedSize = computed(() => props.size ?? options.value.controlSize ?? 'md')

const delegatedProps = reactiveOmit(props, ['class', 'size'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Pagination.PrevTrigger
    data-scope="pagination"
    data-part="prev-trigger"
    :class="cn(
      buttonVariants({
        variant: 'ghost',
        size: resolvedSize,
      }),
      `
        gap-1 px-2.5
        sm:pr-2.5
      `,
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeftIcon />
      <span
        class="
          hidden
          sm:block
        "
      >Previous</span>
    </slot>
  </Pagination.PrevTrigger>
</template>
