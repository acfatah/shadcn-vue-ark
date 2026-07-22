<script setup lang="ts">
import type { ButtonProps } from '../button'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import { Button } from '../button'

const props = defineProps<ButtonProps>()
const forwardedProps = useForwardPropsEmits(props)
</script>

<template>
  <Button
    data-scope="submit-input"
    type="submit"
    v-bind="forwardedProps"
  >
    <slot />
  </Button>
</template>
