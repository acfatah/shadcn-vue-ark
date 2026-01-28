<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover } from '@/components/ui/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger as-child>
      <Button variant="outline">
        Open popover
      </Button>
    </Popover.Trigger>

    <Popover.Content class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="leading-none font-medium">
            Dimensions
          </h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>

        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Input.Label for="popover-width">
              Width
            </Input.Label>
            <Input.Text
              id="popover-width"
              default-value="100%"
              class="col-span-2 h-8"
            />
          </div>

          <div class="grid grid-cols-3 items-center gap-4">
            <Input.Label for="popover-max-width">
              Max. width
            </Input.Label>
            <Input.Text
              id="popover-max-width"
              default-value="300px"
              class="col-span-2 h-8"
            />
          </div>

          <div class="grid grid-cols-3 items-center gap-4">
            <Input.Label for="popover-height">
              Height
            </Input.Label>
            <Input.Text
              id="popover-height"
              default-value="25px"
              class="col-span-2 h-8"
            />
          </div>

          <div class="grid grid-cols-3 items-center gap-4">
            <Input.Label for="popover-max-height">
              Max. height
            </Input.Label>
            <Input.Text
              id="popover-max-height"
              default-value="none"
              class="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>
</template>
