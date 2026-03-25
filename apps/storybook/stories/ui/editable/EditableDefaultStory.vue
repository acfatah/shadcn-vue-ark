<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Editable } from '@/components/ui/editable'

const value = ref('Click to edit')
</script>

<template>
  <Editable.Root
    v-model="value"
    placeholder="Enter text"
    class="w-full max-w-sm"
    activation-mode="dblclick"
  >
    <Editable.Label>Field label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control>
      <Editable.EditTrigger as-child>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Editable.EditTrigger>
      <Editable.SubmitTrigger as-child>
        <Button size="sm">
          Save
        </Button>
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger as-child>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </Editable.CancelTrigger>
    </Editable.Control>
  </Editable.Root>
</template>
