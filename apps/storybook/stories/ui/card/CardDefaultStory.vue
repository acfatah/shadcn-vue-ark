<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Login to your account</Card.Title>
      <Card.Description>
        Enter your email below to login to your account
      </Card.Description>
      <Card.Action>
        <Button variant="link">
          Sign Up
        </Button>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input.Text id="email" type="email" placeholder="m@example.com" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="#"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input.Password id="password" type="password" />
          </div>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex flex-col gap-2">
      <Button class="w-full">
        Login
      </Button>
      <Button variant="outline" class="w-full">
        Login with Google
      </Button>
    </Card.Footer>
  </Card.Root>
</template>
