<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'

useDark()
</script>

<template>
  <component :is="$route.meta.layout || RouterView" />
</template>
