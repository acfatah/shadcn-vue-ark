<script setup lang="ts">
import { IconMinus, IconPlus } from '@tabler/icons-vue'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Field } from '@/components/ui/field'
import { Fieldset } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

const gpuCount = ref(8)

function handleGpuAdjustment(adjustment: number) {
  gpuCount.value = Math.max(1, Math.min(99, gpuCount.value + adjustment))
}

function handleGpuInputChange(e: InputEvent) {
  const target = e.target as HTMLInputElement
  const value = Number.parseInt(target.value, 10)
  if (!Number.isNaN(value) && value >= 1 && value <= 99) {
    gpuCount.value = (value)
  }
  target.value = `${gpuCount.value}`
}
</script>

<template>
  <Fieldset.Root>
    <Field.Group>
      <Fieldset.Root>
        <Fieldset.Legend>Compute Environment</Fieldset.Legend>
        <Fieldset.Description>
          Select the compute environment for your cluster.
        </Fieldset.Description>

        <RadioGroup.Root default-value="kubernetes">
          <RadioGroup.Items>
            <RadioGroup.Item id="kubernetes-r2h" value="kubernetes">
              <RadioGroup.ItemContent>
                <RadioGroup.ItemText>Kubernetes</RadioGroup.ItemText>
                <RadioGroup.ItemDescription>
                  Run GPU workloads on a K8s configured cluster. This is the
                  default.
                </RadioGroup.ItemDescription>
              </RadioGroup.ItemContent>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
            <RadioGroup.Item id="vm-z4k" value="vm">
              <RadioGroup.ItemContent>
                <RadioGroup.ItemText>Virtual Machine</RadioGroup.ItemText>
                <RadioGroup.ItemDescription>
                  Access a VM configured cluster to run workloads. (Coming
                  soon)
                </RadioGroup.ItemDescription>
              </RadioGroup.ItemContent>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </RadioGroup.Items>
        </RadioGroup.Root>
      </Fieldset.Root>
      <Fieldset.Separator />
      <Fieldset.Root orientation="horizontal">
        <Fieldset.Content>
          <Field.Label for="number-of-gpus-f6l">
            Number of GPUs
          </Field.Label>
          <Field.Description>You can add more later.</Field.Description>
        </Fieldset.Content>
        <ButtonGroup.Root>
          <Input.Text
            id="number-of-gpus-f6l"
            :model-value="`${gpuCount}`"
            :size="3"
            class="h-8 w-14! font-mono"
            :max-length="3"
            @input="handleGpuInputChange"
          />
          <Button
            variant="outline"
            size="icon-sm"
            type="button"
            aria-label="Decrement"
            :disabled="gpuCount <= 1"
            @click="handleGpuAdjustment(-1)"
          >
            <IconMinus />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            type="button"
            aria-label="Increment"
            :disabled="gpuCount >= 99"
            @click="handleGpuAdjustment(1)"
          >
            <IconPlus />
          </Button>
        </ButtonGroup.Root>
      </Fieldset.Root>
      <Fieldset.Separator />
      <Fieldset.Root orientation="horizontal">
        <Fieldset.Content>
          <Field.Label for="tinting">
            Wallpaper Tinting
          </Field.Label>
          <Field.Description>
            Allow the wallpaper to be tinted.
          </Field.Description>
        </Fieldset.Content>
        <Switch.Root id="tinting" default-checked>
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Fieldset.Root>
    </Field.Group>
  </Fieldset.Root>
</template>
