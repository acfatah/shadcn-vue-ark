<script setup lang="ts">
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { Pagination } from '@/components/ui/pagination'
import { createListCollection, Select } from '@/components/ui/select'

interface RowsPerPageItem {
  label: string
  value: string
}

const count = 45

const pageSizeCollection = createListCollection<RowsPerPageItem>({
  items: [10, 20, 30, 40, 50].map(pageSize => ({
    label: String(pageSize),
    value: String(pageSize),
  })),
})

const rowsPerPage = ref<string[]>(['10'])
const pageSize = computed(() => Number(rowsPerPage.value[0] ?? '10'))
const page = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(count / pageSize.value)))

const navButtonClass = 'border border-solid border-border bg-background shadow-xs'

function handlePageChange(details: { page: number }) {
  page.value = details.page
}

watch(pageSize, () => {
  if (page.value > totalPages.value)
    page.value = totalPages.value
})
</script>

<template>
  <Pagination.Root
    class="mx-0 w-full items-center justify-between gap-4"
    :count="count"
    :page="page"
    :page-size="pageSize"
    @page-change="handlePageChange"
  >
    <div
      class="
        hidden flex-1 text-sm whitespace-nowrap text-muted-foreground
        sm:block
      "
    >
      0 of {{ count }} row(s) selected.
    </div>

    <div
      class="
        flex items-center gap-6
        lg:gap-8
      "
    >
      <div class="flex items-center gap-2">
        <p
          class="
            hidden text-sm font-medium whitespace-nowrap
            sm:block
          "
        >
          Rows per page
        </p>
        <Select.Root v-model="rowsPerPage" :collection="pageSizeCollection">
          <Select.Trigger class="h-8 w-[70px]">
            <Select.ValueText />
          </Select.Trigger>
          <Select.Content>
            <Select.ItemGroup>
              <Select.Item
                v-for="item in pageSizeCollection.items"
                :key="item.value"
                :item="item"
              >
                <Select.ItemText>{{ item.label }}</Select.ItemText>
              </Select.Item>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Root>
      </div>

      <div class="flex items-center justify-center text-sm font-medium whitespace-nowrap">
        Page {{ page }} of {{ totalPages }}
      </div>

      <div class="flex items-center gap-2">
        <Pagination.First size="icon-sm" :class="navButtonClass">
          <ChevronFirstIcon class="size-4" />
        </Pagination.First>
        <Pagination.Previous size="icon-sm" :class="navButtonClass">
          <ChevronLeftIcon class="size-4" />
        </Pagination.Previous>
        <Pagination.Next size="icon-sm" :class="navButtonClass">
          <ChevronRightIcon class="size-4" />
        </Pagination.Next>
        <Pagination.Last size="icon-sm" :class="navButtonClass">
          <ChevronLastIcon class="size-4" />
        </Pagination.Last>
      </div>
    </div>
  </Pagination.Root>
</template>
