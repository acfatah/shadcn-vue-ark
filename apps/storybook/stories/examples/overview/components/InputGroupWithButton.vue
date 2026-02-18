<script setup lang="ts">
import { IconInfoCircle, IconStar } from '@tabler/icons-vue'
import { ref } from 'vue'

import { InputGroup } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Popover,
} from '@/components/ui/popover'

const isFavorite = ref(false)
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <Label for="input-secure-19" class="sr-only">
      Input Secure
    </Label>
    <InputGroup.Root class="[--radius:9999px]">
      <InputGroup.Input id="input-secure-19" class="pl-0.5!" />
      <Popover.Root>
        <Popover.Trigger as-child>
          <InputGroup.Addon>
            <InputGroup.Button
              variant="secondary"
              size="icon-xs"
              aria-label="Info"
            >
              <IconInfoCircle />
            </InputGroup.Button>
          </InputGroup.Addon>
        </Popover.Trigger>
        <Popover.Content
          align="start"
          :align-offset="10"
          class="flex flex-col gap-1 rounded-xl text-sm"
        >
          <p class="font-medium">
            Your connection is not secure.
          </p>
          <p>You should not enter any sensitive information on this site.</p>
        </Popover.Content>
      </Popover.Root>
      <InputGroup.Addon class="pl-1! text-muted-foreground">
        https://
      </InputGroup.Addon>
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button
          size="icon-xs"
          aria-label="Favorite"
          @click="isFavorite = !isFavorite"
        >
          <IconStar
            :data-favorite="isFavorite"
            class="data-[favorite=true]:fill-primary data-[favorite=true]:stroke-primary"
          />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  </div>
</template>
