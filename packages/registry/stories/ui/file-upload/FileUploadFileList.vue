<script setup lang="ts">
import { FileUpload, useFileUploadContext } from '@/components/ui/file-upload'

const fileUpload = useFileUploadContext()
</script>

<template>
  <FileUpload.ItemGroup v-if="fileUpload.acceptedFiles.length > 0">
    <FileUpload.Item
      v-for="file in fileUpload.acceptedFiles"
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
</template>
