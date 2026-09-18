<script setup lang="ts">
import { ref } from 'vue'

import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs } from '@/components/ui/tabs'

// Uncontrolled preview state; usage verified against each component's stories.
const inputText = ref('Themed value')
const switchChecked = ref(true)
const tabsValue = ref('account')
const sliderValue = ref([50])
</script>

<template>
  <div
    class="
      grid gap-6
      sm:grid-cols-2
      xl:grid-cols-3
    "
  >
    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Buttons
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <Button variant="default">
          Primary
        </Button>
        <Button variant="secondary">
          Secondary
        </Button>
        <Button variant="destructive">
          Destructive
        </Button>
        <Button variant="outline">
          Outline
        </Button>
        <Button variant="ghost">
          Ghost
        </Button>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Badges
      </h3>
      <div class="flex flex-wrap items-center gap-2">
        <Badge variant="default">
          Default
        </Badge>
        <Badge variant="secondary">
          Secondary
        </Badge>
        <Badge variant="destructive">
          Destructive
        </Badge>
        <Badge variant="outline">
          Outline
        </Badge>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Input
      </h3>
      <div class="flex flex-col gap-2">
        <Label for="showcase-input">Email</Label>
        <Input.Text
          id="showcase-input"
          v-model="inputText"
          placeholder="Type here"
        />
        <Input.Text placeholder="Invalid input" invalid />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Toggles
      </h3>
      <div class="flex flex-col gap-3">
        <Switch.Root v-model:checked="switchChecked">
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Airplane mode</Switch.Label>
        </Switch.Root>
        <Checkbox.Root default-checked>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Accept terms</Checkbox.Label>
        </Checkbox.Root>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Slider and progress
      </h3>
      <div class="flex flex-col gap-4">
        <Slider v-model="sliderValue" :max="100" :step="1" />
        <Progress :default-value="66" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Separator
      </h3>
      <div class="flex flex-col gap-3">
        <Separator />
        <div class="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Alert
      </h3>
      <div class="flex flex-col gap-3">
        <Alert.Root>
          <Alert.Title>Heads up</Alert.Title>
          <Alert.Description>
            You can add components to your app using the CLI.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root variant="destructive">
          <Alert.Title>Session expired</Alert.Title>
          <Alert.Description>Please log in again.</Alert.Description>
        </Alert.Root>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Tabs
      </h3>
      <Tabs.Root v-model="tabsValue" variant="underline">
        <Tabs.List>
          <Tabs.Trigger value="account">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger value="password">
            Password
          </Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="account">
          <p class="text-sm text-muted-foreground">
            Manage your account settings.
          </p>
        </Tabs.Content>
        <Tabs.Content value="password">
          <p class="text-sm text-muted-foreground">
            Change your password here.
          </p>
        </Tabs.Content>
      </Tabs.Root>
    </section>

    <section class="flex flex-col gap-3">
      <h3 class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Card
      </h3>
      <Card.Root>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Description>A short description of the card.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p class="text-sm">
            Put any content here.
          </p>
        </Card.Content>
        <Card.Footer>
          <p class="text-sm text-muted-foreground">
            Card footer
          </p>
        </Card.Footer>
      </Card.Root>
    </section>
  </div>
</template>
