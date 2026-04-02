<script setup lang="ts">
import { FileUpload } from '@ark-ui/vue/file-upload'
</script>

<template>
  <FileUpload.Context v-slot="context">
    <slot v-bind="context" />
  </FileUpload.Context>
</template>
