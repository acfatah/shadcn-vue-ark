<script setup lang="ts">
// import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'

import { cn } from '@/lib/utils'

import type { ButtonGroupVariants } from '.'

import { buttonGroupVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}>()
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
