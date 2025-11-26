<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
        <Icon icon="lucide:chevron-right" />
      </Button>
    </div>
  </div>
</template>
