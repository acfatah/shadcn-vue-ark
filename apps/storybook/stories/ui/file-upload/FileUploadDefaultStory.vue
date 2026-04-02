<script setup lang="ts">
import { UploadIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'

interface Props {
  disabled?: boolean
  maxFiles?: number
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  maxFiles: 5,
})
</script>

<template>
  <FileUpload.Root
    :max-files="maxFiles"
    :disabled="disabled"
    class="w-full max-w-sm"
  >
    <FileUpload.HiddenInput />
    <FileUpload.Dropzone>
      <UploadIcon class="size-8 text-muted-foreground" />
      <div class="space-y-1">
        <p class="text-sm font-medium">
          Drag and drop files here
        </p>
        <p class="text-xs text-muted-foreground">
          Or click to browse
        </p>
      </div>
      <FileUpload.Trigger as-child>
        <Button variant="outline" size="sm">
          Choose Files
        </Button>
      </FileUpload.Trigger>
    </FileUpload.Dropzone>

    <FileUpload.Context v-slot="{ acceptedFiles }">
      <FileUpload.ItemGroup v-if="acceptedFiles.length > 0">
        <FileUpload.Item
          v-for="file in acceptedFiles"
          :key="file.name"
          :file="file"
        >
          <FileUpload.ItemPreview type="image/*">
            <FileUpload.ItemPreviewImage />
          </FileUpload.ItemPreview>
          <div class="flex min-w-0 flex-col">
            <FileUpload.ItemName />
            <FileUpload.ItemSizeText />
          </div>
          <FileUpload.ItemDeleteTrigger />
        </FileUpload.Item>
      </FileUpload.ItemGroup>
    </FileUpload.Context>
  </FileUpload.Root>
</template>
