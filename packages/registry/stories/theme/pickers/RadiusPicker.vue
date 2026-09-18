<script setup lang="ts">
import type { RadiusName } from '../lib/config'

import { RADII } from '../lib/config'

const model = defineModel<RadiusName>({ required: true })
</script>

<template>
  <div role="group" aria-label="Radius" class="flex flex-wrap gap-2">
    <button
      v-for="option in RADII"
      :key="option.name"
      type="button"
      :aria-pressed="model === option.name"
      :data-active="model === option.name"
      class="
        rounded-md border px-2.5 py-1 text-sm transition-colors
        hover:bg-accent hover:text-accent-foreground
        data-[active=true]:border-primary data-[active=true]:ring-1 data-[active=true]:ring-primary
      "
      @click="model = option.name"
    >
      {{ option.label }}
    </button>
  </div>
</template>
