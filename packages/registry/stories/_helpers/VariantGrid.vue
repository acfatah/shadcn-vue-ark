<script setup lang="ts">
/*
  Declarative grid for "show every variant / size" stories. Renders the default
  slot once per value with the value scoped in, plus a caption. Lives in
  _helpers so it stays out of the ?raw payload (it is presentation scaffolding,
  not part of any component's documented source).

  Usage:
    <VariantGrid :values="['sm', 'md', 'lg']" v-slot="{ value }">
      <Button :size="value">{{ value }}</Button>
    </VariantGrid>
*/
defineProps<{
  /** The variant or size values to iterate. */
  values: readonly unknown[]
  /** Caption renderer; defaults to `String(value)`. */
  label?: (value: unknown) => string
}>()
</script>

<template>
  <div class="flex flex-wrap items-end gap-6">
    <div
      v-for="(value, index) in values"
      :key="index"
      class="flex flex-col items-center gap-2"
    >
      <slot :value="value" :index="index" />
      <span class="text-xs text-muted-foreground">
        {{ label ? label(value) : String(value) }}
      </span>
    </div>
  </div>
</template>
