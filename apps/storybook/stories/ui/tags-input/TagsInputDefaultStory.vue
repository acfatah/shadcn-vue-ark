<script setup lang="ts">
import { ref } from 'vue'

import { TagsInput } from '@/components/ui/tags-input'

const modelValue = ref(['Apple', 'Banana'])
</script>

<template>
  <TagsInput.Root v-model="modelValue">
    <TagsInput.Control>
      <TagsInput.Item
        v-for="(item, index) in modelValue"
        :key="item"
        :index="index"
        :value="item"
      >
        <TagsInput.ItemPreview>
          <TagsInput.ItemText>{{ item }}</TagsInput.ItemText>
          <TagsInput.ItemDelete />
        </TagsInput.ItemPreview>

        <TagsInput.ItemInput />
      </TagsInput.Item>

      <TagsInput.Input placeholder="Fruits..." class="basis-full" />
    </TagsInput.Control>
  </TagsInput.Root>
</template>
