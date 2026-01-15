<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'

import { LucidePlus } from 'lucide-vue-next'
</script>

<template>
  <Empty.Root class="flex-none border">
    <Empty.Header>
      <Empty.Media>
        <Avatar.Group>
          <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
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
      </Empty.Media>

      <Empty.Title>No Team Members</Empty.Title>
      <Empty.Description>
        Invite your team to collaborate on this project.
      </Empty.Description>
    </Empty.Header>

    <Empty.Content>
      <Button size="sm">
        <LucidePlus data-part="icon" />
        Invite Members
      </Button>
    </Empty.Content>
  </Empty.Root>
</template>
