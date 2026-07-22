<script setup lang="ts">
import type { ButtonGroupRootProps } from './types'

import { ark } from '@ark-ui/vue'

import { cn } from '@/lib/utils'

import { buttonGroupVariants } from './variant'

const props = defineProps<ButtonGroupRootProps>()
</script>

<template>
  <ark.div
    role="group"
    data-scope="button-group"
    data-part="root"
    :data-orientation="props.orientation"
    :class="cn(
      buttonGroupVariants({ orientation: props.orientation }),
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
