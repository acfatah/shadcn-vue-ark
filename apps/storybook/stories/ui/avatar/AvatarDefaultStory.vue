<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'

const props = defineProps<{
  shape?: 'round' | 'square'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()
</script>

<template>
  <div class="flex flex-row flex-wrap items-center gap-12">
    <Avatar.Root :shape="props.shape" :size="props.size">
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>

    <Avatar.Root :shape="props.shape" :size="props.size" class="rounded-lg">
      <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar.Root>

    <Avatar.Group>
      <Avatar.Root :shape="props.shape" :size="props.size">
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root :shape="props.shape" :size="props.size">
        <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
        <Avatar.Fallback>LR</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root :shape="props.shape" :size="props.size">
        <Avatar.Image
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar.Root>
    </Avatar.Group>
  </div>
</template>
