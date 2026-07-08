<script setup lang="ts">
import { Fieldset } from '@/components/ui/fieldset'

import AppearanceSettings from './components/AppearanceSetting.vue'
import ButtonGroupDemo from './components/ButtonGroupDemo.vue'
import ButtonGroupInputGroupDemo from './components/ButtonGroupInputGroupDemo.vue'
import EmptyAvatarGroup from './components/EmptyAvatarGroup.vue'
import FieldDemo from './components/FieldDemo.vue'
import FieldSliderDemo from './components/FieldSliderDemo.vue'
import InputGroupDemo from './components/InputGroupDemo.vue'
import InputGroupWithButton from './components/InputGroupWithButton.vue'
import ItemDemo from './components/ItemDemo.vue'
import SpinnerBadge from './components/SpinnerBadge.vue'
import SpinnerEmpty from './components/SpinnerEmpty.vue'
</script>

<template>
  <div
    class="
      mx-auto grid gap-8 py-1 font-sans
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4 xl:gap-6
      2xl:gap-8
    "
  >
    <div
      class="
        flex flex-col gap-6
        *:[div]:w-full *:[div]:max-w-full
      "
    >
      <FieldDemo />
    </div>
    <div
      class="
        flex flex-col gap-6
        *:[div]:w-full *:[div]:max-w-full
      "
    >
      <EmptyAvatarGroup />
      <SpinnerBadge />
      <ButtonGroupInputGroupDemo />
      <FieldSliderDemo />
      <InputGroupDemo />
    </div>
    <div
      class="
        flex flex-col gap-6
        *:[div]:w-full *:[div]:max-w-full
      "
    >
      <InputGroupWithButton />
      <ItemDemo />
      <Fieldset.Separator class="my-4">
        Appearance Settings
      </Fieldset.Separator>
      <AppearanceSettings />
    </div>
    <div
      class="
        order-first flex flex-col gap-6
        xl:order-last xl:flex
        *:[div]:w-full *:[div]:max-w-full
      "
    >
      <!-- <NotionPromptForm /> -->
      <ButtonGroupDemo />
      <!-- <FieldCheckbox />
      <div class="flex justify-between gap-4">
        <ButtonGroupNested />
        <ButtonGroupPopover />
      </div>
      <FieldHear /> -->
      <SpinnerEmpty />
    </div>
  </div>
</template>
