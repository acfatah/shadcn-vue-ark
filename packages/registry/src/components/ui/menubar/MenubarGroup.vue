<script setup lang="ts">
import { Menu } from '@ark-ui/vue/menu'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { MenuItemGroupProps } from './types'

interface Props extends MenuItemGroupProps {}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Menu.ItemGroup
    v-bind="forwardedProps"
    data-scope="menubar"
    data-part="group"
  >
    <slot />
  </Menu.ItemGroup>
</template>
