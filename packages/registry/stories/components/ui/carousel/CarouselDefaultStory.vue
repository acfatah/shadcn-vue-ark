<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Carousel } from '@/components/ui/carousel'
</script>

<template>
  <Carousel.Root class="w-full max-w-xs">
    <Carousel.Content>
      <Carousel.Item v-for="i in 5" :key="i">
        <div class="p-1">
          <Card.Root>
            <Card.Content class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{{ i }}</span>
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</template>
