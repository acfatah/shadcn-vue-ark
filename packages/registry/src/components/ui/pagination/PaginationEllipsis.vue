<script setup lang="ts">
import type { PaginationEllipsisProps } from '@ark-ui/vue/pagination'
import type { HTMLAttributes } from 'vue'

import { Pagination } from '@ark-ui/vue/pagination'
import { reactiveOmit } from '@vueuse/core'
import { MoreHorizontal } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PaginationEllipsisProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Pagination.Ellipsis
    data-scope="pagination"
    data-part="ellipsis"
    v-bind="forwardedProps"
    :index="props.index"
    :class="cn(
      'flex size-9 items-center justify-center',
      props.class,
    )"
  >
    <slot>
      <MoreHorizontal class="size-4" />
      <span class="sr-only">More pages</span>
    </slot>
  </Pagination.Ellipsis>
</template>
