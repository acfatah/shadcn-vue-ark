<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex flex-row flex-wrap items-center gap-12">
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>

    <Avatar.Root class="rounded-lg">
      <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar.Root>

    <Avatar.Group>
      <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
        <Avatar.Fallback>LR</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Image
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <Avatar.Fallback>ER</Avatar.Fallback>
      </Avatar.Root>
    </Avatar.Group>
  </div>
</template>
