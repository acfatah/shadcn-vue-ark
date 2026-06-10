<script setup lang="ts">
import { ChevronRightIcon } from 'lucide-vue-next'

import { Button, variant as buttonVariants } from '@/components/ui/button'

const variants = Object.keys(buttonVariants) as Array<keyof typeof buttonVariants>
</script>

<template>
  <div
    class="
      flex flex-col items-start gap-8
      sm:flex-row
    "
  >
    <div
      v-for="variant in variants"
      :key="variant"
      class="flex items-start gap-2"
    >
      <Button
        :variant="variant"
        class="w-min"
      >
        {{ variant }}
      </Button>

      <Button :variant="variant" size="icon">
        <ChevronRightIcon data-part="icon" />
      </Button>
    </div>
  </div>
</template>
