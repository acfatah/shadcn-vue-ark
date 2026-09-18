<script setup lang="ts">
import type { BaseColorName } from '../lib/config'

import { BASE_COLOR_NAMES, getBaseColor } from '../lib/config'

const model = defineModel<BaseColorName>({ required: true })

function swatch(name: BaseColorName): string {
  const light = getBaseColor(name)?.cssVars?.light as
    | Record<string, string>
    | undefined

  return light?.primary ?? 'transparent'
}
</script>

<template>
  <!--
    Labelled group of toggle buttons (aria-pressed), not a radiogroup: these are
    plain buttons operated by Tab + Enter/Space, so we do not advertise the
    arrow-key radiogroup contract we would not implement.
  -->
  <div role="group" aria-label="Base color" class="flex flex-wrap gap-2">
    <button
      v-for="name in BASE_COLOR_NAMES"
      :key="name"
      type="button"
      :aria-pressed="model === name"
      :data-active="model === name"
      class="
        flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm capitalize transition-colors
        hover:bg-accent hover:text-accent-foreground
        data-[active=true]:border-primary data-[active=true]:ring-1 data-[active=true]:ring-primary
      "
      @click="model = name"
    >
      <span
        class="size-4 rounded-full border border-black/10"
        :style="{ backgroundColor: swatch(name) }"
      />
      {{ name }}
    </button>
  </div>
</template>
