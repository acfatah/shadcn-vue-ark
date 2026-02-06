<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs } from '@/components/ui/tabs'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <Tabs.Root default-value="account">
      <Tabs.List>
        <Tabs.Trigger value="account">
          Account
        </Tabs.Trigger>
        <Tabs.Trigger value="password">
          Password
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <Card.Root>
          <Card.Header>
            <Card.Title>Account</Card.Title>
            <Card.Description>
              Make changes to your account here. Click save when you're
              done.
            </Card.Description>
          </Card.Header>
          <Card.Content class="grid gap-6">
            <div class="grid gap-3">
              <Label for="tabs-demo-name">Name</Label>
              <Input.Text id="tabs-demo-name" default-value="Pedro Duarte" />
            </div>
            <div class="grid gap-3">
              <Label for="tabs-demo-username">Username</Label>
              <Input.Text id="tabs-demo-username" default-value="@peduarte" />
            </div>
          </Card.Content>
          <Card.Footer>
            <Input.Button>Save changes</Input.Button>
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="password">
        <Card.Root>
          <Card.Header>
            <Card.Title>Password</Card.Title>
            <Card.Description>
              Change your password here. After saving, you'll be logged
              out.
            </Card.Description>
          </Card.Header>
          <Card.Content class="grid gap-6">
            <div class="grid gap-3">
              <Label for="tabs-demo-current">Current password</Label>
              <Input.Password id="tabs-demo-current" />
            </div>
            <div class="grid gap-3">
              <Label for="tabs-demo-new">New password</Label>
              <Input.Password id="tabs-demo-new" />
            </div>
          </Card.Content>
          <Card.Footer>
            <Input.Button>Save password</Input.Button>
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</template>
