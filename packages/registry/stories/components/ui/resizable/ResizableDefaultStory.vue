<script setup lang="ts">
import { Resizable } from '@/components/ui/resizable'
</script>

<template>
  <Resizable.PanelGroup
    orientation="horizontal"
    :default-size="[50, 50]"
    :panels="[
      { id: 'one' },
      { id: 'two' },
    ]"
    class="
      max-w-md rounded-lg border
      md:min-w-[450px]
    "
  >
    <Resizable.Panel id="one">
      <div class="flex h-[200px] items-center justify-center p-6">
        <span class="font-semibold">One</span>
      </div>
    </Resizable.Panel>
    <Resizable.Handle id="one:two" />
    <Resizable.Panel id="two">
      <Resizable.PanelGroup
        orientation="vertical"
        :default-size="[25, 75]"
        :panels="[
          { id: 'two-top' },
          { id: 'two-bottom' },
        ]"
      >
        <Resizable.Panel id="two-top">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Two</span>
          </div>
        </Resizable.Panel>
        <Resizable.Handle id="two-top:two-bottom" />
        <Resizable.Panel id="two-bottom">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Three</span>
          </div>
        </Resizable.Panel>
      </Resizable.PanelGroup>
    </Resizable.Panel>
  </Resizable.PanelGroup>
</template>
