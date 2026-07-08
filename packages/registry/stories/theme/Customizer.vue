<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { Switch } from '@/components/ui/switch'

import type { CustomizerConfig } from './lib/config'

import { DEFAULT_CONFIG, resolveTheme } from './lib/config'
import { encodePreset } from './lib/preset'
import BaseColorPicker from './pickers/BaseColorPicker.vue'
import RadiusPicker from './pickers/RadiusPicker.vue'
import ThemePicker from './pickers/ThemePicker.vue'
import PreviewRoot from './PreviewRoot.vue'
import PreviewShowcase from './PreviewShowcase.vue'

const props = withDefaults(
  defineProps<{ initialConfig?: CustomizerConfig }>(),
  { initialConfig: () => ({ ...DEFAULT_CONFIG }) },
)

// Normalize the seed so an initialConfig whose theme is invalid for its base
// color (e.g. a loaded preset) starts consistent; the watch keeps it valid on
// later base-color changes.
const config = reactive<CustomizerConfig>({
  ...props.initialConfig,
  theme: resolveTheme(props.initialConfig.baseColor, props.initialConfig.theme),
})
const dark = ref(false)

watch(
  () => config.baseColor,
  (baseColor) => {
    config.theme = resolveTheme(baseColor, config.theme)
  },
)

const presetCode = computed(() => encodePreset(config))
</script>

<template>
  <div
    class="
      flex size-full min-h-0 flex-col gap-4 bg-background p-4 text-foreground
      md:flex-row
    "
  >
    <aside
      class="
        flex w-full shrink-0 flex-col gap-6
        md:w-72
      "
    >
      <div>
        <h2 class="text-lg font-semibold">
          Customize
        </h2>
        <p class="text-sm text-muted-foreground">
          Pick a base color, theme and radius.
        </p>
      </div>

      <section class="flex flex-col gap-2">
        <span class="text-sm font-medium">Base color</span>
        <BaseColorPicker v-model="config.baseColor" />
      </section>

      <section class="flex flex-col gap-2">
        <span class="text-sm font-medium">Theme</span>
        <ThemePicker v-model="config.theme" :base-color="config.baseColor" />
      </section>

      <section class="flex flex-col gap-2">
        <span class="text-sm font-medium">Radius</span>
        <RadiusPicker v-model="config.radius" />
      </section>

      <section class="flex items-center gap-2">
        <Switch.Root v-model:checked="dark">
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Dark preview</Switch.Label>
        </Switch.Root>
      </section>

      <!-- Export panel placeholder; copy / load / shuffle arrive in Phase 3. -->
      <section class="mt-auto flex flex-col gap-1.5">
        <span class="text-sm font-medium">Preset</span>
        <code class="rounded-md border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">--preset {{ presetCode }}</code>
      </section>
    </aside>

    <main class="min-h-0 flex-1 overflow-auto rounded-xl border p-6">
      <PreviewRoot :config="config" :dark="dark">
        <PreviewShowcase />
      </PreviewRoot>
    </main>
  </div>
</template>
