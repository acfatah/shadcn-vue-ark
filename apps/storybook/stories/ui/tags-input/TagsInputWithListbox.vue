<script setup lang="ts">
import { CheckIcon, ChevronDown } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { Button } from '@/components/ui/button'
// Previous import line:
import { createListCollection, Listbox } from '@ark-ui/vue/listbox'
// import { createListCollection, Listbox } from '@/components/ui/listbox'
import { Popover } from '@/components/ui/popover'
import { TagsInput } from '@/components/ui/tags-input'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const searchTerm = ref('')
const modelValue = ref<string[]>(['nuxt', 'remix'])
const open = ref(false)

const frameworkLabelByValue = computed(() =>
  Object.fromEntries(frameworks.map(item => [item.value, item.label])),
)

const filteredFrameworks = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()

  if (!term) {
    return frameworks
  }

  return frameworks.filter(option =>
    option.label.toLowerCase().includes(term),
  )
})

const collection = computed(() => createListCollection({
  items: filteredFrameworks.value,
}))

watch(searchTerm, (value) => {
  if (value) {
    open.value = true
  }
})

function handleSearchInput(event: Event) {
  const target = event.target as HTMLInputElement | null

  searchTerm.value = target?.value ?? ''
}

function handleValueChange() {
  searchTerm.value = ''
}

function getFrameworkLabel(value: string) {
  return frameworkLabelByValue.value[value] ?? value
}
</script>

<template>
  <Popover.Root v-model:open="open" :auto-focus="false">
    <Listbox.Root
      v-model="modelValue"
      :collection="collection"
      :composite="false"
      highlight-on-hover
      multiple
      @value-change="handleValueChange"
    >
      <Popover.Anchor class="inline-flex w-[300px]">
        <TagsInput.Root v-model="modelValue" class="w-full">
          <TagsInput.Control>
            <TagsInput.Item
              v-for="(item, index) in modelValue"
              :key="item"
              :index="index"
              :value="item"
            >
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>
                  {{ getFrameworkLabel(item) }}
                </TagsInput.ItemText>
                <TagsInput.ItemDelete />
              </TagsInput.ItemPreview>

              <TagsInput.ItemInput />
            </TagsInput.Item>

            <TagsInput.Input
              :value="searchTerm"
              placeholder="Frameworks..."
              @input="handleSearchInput"
              @keydown.enter.prevent
              @keydown.down="open = true"
            />

            <Popover.Trigger as-child>
              <Button size="icon-sm" variant="ghost" class="order-last ml-auto self-start">
                <ChevronDown class="size-3.5" />
              </Button>
            </Popover.Trigger>
          </TagsInput.Control>
        </TagsInput.Root>
      </Popover.Anchor>

      <Popover.Content
        class="p-1"
        @open-auto-focus.prevent
      >
        <Listbox.Content
          class="
            scroll-py-1 overflow-x-hidden overflow-y-auto outline-hidden
            empty:p-1
            empty:after:block empty:after:content-['No_options']
          "
          tabindex="0"
        >
          <Listbox.Item
            v-for="item in filteredFrameworks"
            :key="item.value"
            class="
              relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm
              outline-hidden select-none
              data-disabled:pointer-events-none data-disabled:opacity-50
              data-highlighted:bg-accent data-highlighted:text-accent-foreground
              [&_svg]:pointer-events-none [&_svg]:shrink-0
              [&_svg:not([class*='size-'])]:size-4
              [&_svg:not([class*='text-'])]:text-muted-foreground
            "
            :item="item"
          >
            <span>{{ item.label }}</span>

            <Listbox.ItemIndicator
              class="ml-auto inline-flex items-center justify-center"
            >
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        </Listbox.Content>
      </Popover.Content>
    </Listbox.Root>
  </Popover.Root>
</template>
