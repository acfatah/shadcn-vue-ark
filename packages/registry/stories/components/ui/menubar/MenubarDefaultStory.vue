<script setup lang="ts">
import { Menubar } from '@/components/ui/menubar'
</script>

<template>
  <Menubar.Root>
    <Menubar.Menu>
      <Menubar.Trigger>File</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item value="new-tab">
          New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item value="new-window">
          New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item value="new-incognito-window" disabled>
          New Incognito Window
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Sub>
          <Menubar.SubTrigger>Share</Menubar.SubTrigger>
          <Menubar.SubContent>
            <Menubar.Item value="email-link">
              Email link
            </Menubar.Item>
            <Menubar.Item value="messages">
              Messages
            </Menubar.Item>
            <Menubar.Item value="notes">
              Notes
            </Menubar.Item>
          </Menubar.SubContent>
        </Menubar.Sub>
        <Menubar.Separator />
        <Menubar.Item value="print">
          Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item value="undo">
          Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item value="redo">
          Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Sub>
          <Menubar.SubTrigger>Find</Menubar.SubTrigger>
          <Menubar.SubContent>
            <Menubar.Item value="search-the-web">
              Search the web
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item value="find">
              Find...
            </Menubar.Item>
            <Menubar.Item value="find-next">
              Find Next
            </Menubar.Item>
            <Menubar.Item value="find-previous">
              Find Previous
            </Menubar.Item>
          </Menubar.SubContent>
        </Menubar.Sub>
        <Menubar.Separator />
        <Menubar.Item value="cut">
          Cut
        </Menubar.Item>
        <Menubar.Item value="copy">
          Copy
        </Menubar.Item>
        <Menubar.Item value="paste">
          Paste
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>View</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.CheckboxItem value="always-show-bookmarks-bar" :checked="false">
          Always Show Bookmarks Bar
        </Menubar.CheckboxItem>
        <Menubar.CheckboxItem value="always-show-full-urls" :checked="true">
          Always Show Full URLs
        </Menubar.CheckboxItem>
        <Menubar.Separator />
        <Menubar.Item value="reload" inset>
          Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item
          value="force-reload"
          disabled
          inset
        >
          Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item value="toggle-fullscreen" inset>
          Toggle Fullscreen
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item value="hide-sidebar" inset>
          Hide Sidebar
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Profiles</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.RadioGroup model-value="benoit">
          <Menubar.RadioItem value="andy">
            Andy
          </Menubar.RadioItem>
          <Menubar.RadioItem value="benoit">
            Benoit
          </Menubar.RadioItem>
          <Menubar.RadioItem value="Luis">
            Luis
          </Menubar.RadioItem>
        </Menubar.RadioGroup>
        <Menubar.Separator />
        <Menubar.Item value="edit-profile" inset>
          Edit...
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item value="add-profile" inset>
          Add Profile...
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
  </Menubar.Root>
</template>
