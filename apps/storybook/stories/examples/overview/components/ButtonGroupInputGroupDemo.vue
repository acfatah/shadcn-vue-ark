<script setup lang="ts">
import { AudioLinesIcon, PlusIcon } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { InputGroup } from '@/components/ui/input-group'
import { Tooltip } from '@/components/ui/tooltip'

const voiceEnabled = ref(false)
</script>

<template>
  <ButtonGroup.Root class="[--radius:9999rem]">
    <ButtonGroup.Root>
      <Button variant="outline" size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root class="flex-1">
      <InputGroup.Root>
        <InputGroup.Input
          :placeholder="voiceEnabled ? 'Record and send audio...' : 'Send a message...'"
          :disabled="voiceEnabled"
        />
        <InputGroup.Addon align="inline-end">
          <Tooltip.Root>
            <Tooltip.Trigger as-child>
              <InputGroup.Button
                :data-active="voiceEnabled"
                class="
                  data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700
                  dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100
                "
                :aria-pressed="voiceEnabled"
                size="icon-xs"
                aria-label="Voice Mode"
                @click="() => voiceEnabled = !voiceEnabled"
              >
                <AudioLinesIcon />
              </InputGroup.Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Voice Mode</Tooltip.Content>
          </Tooltip.Root>
        </InputGroup.Addon>
      </InputGroup.Root>
    </ButtonGroup.Root>
  </ButtonGroup.Root>
</template>
