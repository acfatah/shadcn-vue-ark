<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.nav
    v-bind="delegatedProps"
    data-scope="menubar"
    data-part="root"
    role="menubar"
    :class="cn(
      'flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs',
      props.class,
    )"
  >
    <slot />
  </ark.nav>
</template>
