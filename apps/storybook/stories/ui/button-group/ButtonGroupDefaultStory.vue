<script setup lang="ts">
import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterPlusIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
} from 'lucide-vue-next'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

const label = ref('personal')
</script>

<template>
  <ButtonGroup.Root>
    <ButtonGroup.Root
      class="
        hidden
        sm:flex
      "
    >
      <Button variant="outline" size="icon" aria-label="Go Back">
        <ArrowLeftIcon />
      </Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button variant="outline">
        Archive
      </Button>
      <Button variant="outline">
        Report
      </Button>
    </ButtonGroup.Root>
    <ButtonGroup.Root>
      <Button variant="outline">
        Snooze
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger as-child>
          <Button variant="outline" size="icon" aria-label="More Options">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" class="w-52">
          <DropdownMenu.Group>
            <DropdownMenu.Item value="read">
              <MailCheckIcon />
              Mark as Read
            </DropdownMenu.Item>
            <DropdownMenu.Item value="archive">
              <ArchiveIcon />
              Archive
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item value="snooze">
              <ClockIcon />
              Snooze
            </DropdownMenu.Item>
            <DropdownMenu.Item value="add-to-calendar">
              <CalendarPlusIcon />
              Add to Calendar
            </DropdownMenu.Item>
            <DropdownMenu.Item value="add-to-list">
              <ListFilterPlusIcon />
              Add to List
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <TagIcon class="mr-2 size-4" />
                Label As...
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.RadioGroup v-model="label">
                  <DropdownMenu.RadioItem value="personal">
                    Personal
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="work">
                    Work
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="other">
                    Other
                  </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group class="border-none bg-red-100!">
            <DropdownMenu.Item
              variant="destructive"
              value="trash"
            >
              <Trash2Icon />
              Trash
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </ButtonGroup.Root>
  </ButtonGroup.Root>
</template>
