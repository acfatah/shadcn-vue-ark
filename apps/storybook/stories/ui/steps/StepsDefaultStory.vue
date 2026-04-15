<script setup lang="ts">
import { BookUser, CreditCard, ShoppingBag, Truck } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Steps } from '@/components/ui/steps'

const steps = [
  {
    title: 'Address',
    description: 'Add your address',
    icon: BookUser,
  },
  {
    title: 'Shipping',
    description: 'Set your preferred',
    icon: Truck,
  },
  {
    title: 'Payment',
    description: 'Add any payment',
    icon: CreditCard,
  },
  {
    title: 'Checkout',
    description: 'Confirm your order',
    icon: ShoppingBag,
  },
]
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-6">
    <Steps.Root :count="steps.length">
      <Steps.List>
        <Steps.Item
          v-for="(step, index) in steps"
          :key="index"
          :index="index"
        >
          <Steps.Trigger>
            <Steps.Indicator>
              <component :is="step.icon" class="size-4" />
            </Steps.Indicator>
            <div class="flex flex-col items-center">
              <span class="text-sm font-medium">{{ step.title }}</span>
              <span class="text-xs text-muted-foreground">{{ step.description }}</span>
            </div>
          </Steps.Trigger>
          <Steps.Separator v-if="index < steps.length - 1" />
        </Steps.Item>
      </Steps.List>

      <Steps.Content
        v-for="(step, index) in steps"
        :key="index"
        :index="index"
        class="rounded-md border bg-card p-6 text-card-foreground"
      >
        <p class="text-sm font-medium text-foreground">
          {{ step.title }}
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          Step {{ index + 1 }} of {{ steps.length }} — {{ step.description }}.
        </p>
      </Steps.Content>

      <Steps.CompletedContent class="rounded-md border bg-card p-6 text-card-foreground">
        <p class="text-sm font-medium text-foreground">
          All steps completed
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          Thanks for placing your order.
        </p>
      </Steps.CompletedContent>

      <div class="flex items-center justify-between gap-2">
        <Steps.PrevTrigger as-child>
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger as-child>
          <Button size="sm">
            Next
          </Button>
        </Steps.NextTrigger>
      </div>
    </Steps.Root>
  </div>
</template>
