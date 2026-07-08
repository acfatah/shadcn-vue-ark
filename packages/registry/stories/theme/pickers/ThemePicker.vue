<script setup lang="ts">
import { computed } from 'vue'

import type { BaseColorName, ThemeName } from '../lib/config'

import { getTheme, getThemesForBaseColor } from '../lib/config'

const props = defineProps<{ baseColor: BaseColorName }>()
const model = defineModel<ThemeName>({ required: true })

const themes = computed(() => getThemesForBaseColor(props.baseColor))

function swatch(name: ThemeName): string {
  const light = getTheme(name)?.cssVars?.light as
    | Record<string, string>
    | undefined

  return light?.primary ?? 'transparent'
}
</script>

<template>
  <div role="group" aria-label="Theme" class="flex flex-wrap gap-1.5">
    <button
      v-for="name in themes"
      :key="name"
      type="button"
      :aria-label="name"
      :aria-pressed="model === name"
      :title="name"
      :data-active="model === name"
      class="
        size-6 rounded-full border border-black/10 transition-transform
        hover:scale-110
        data-[active=true]:ring-2 data-[active=true]:ring-primary data-[active=true]:ring-offset-2
        data-[active=true]:ring-offset-background
      "
      :style="{ backgroundColor: swatch(name) }"
      @click="model = name"
    />
  </div>
</template>
