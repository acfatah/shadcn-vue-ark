import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { FileUpload } from '@/components/ui/file-upload'
import { registryItem } from '@/components/ui/file-upload/_registry'

import FileUploadDefaultStory from './FileUploadDefaultStory.vue'
import FileUploadDefaultSource from './FileUploadDefaultStory.vue?raw'

const meta = {
  title: 'Components/UI/FileUpload',
  component: FileUpload.Root,
  tags: ['autodocs'],

  args: {
    disabled: false,
    maxFiles: 5,
  },

  argTypes: {
    disabled: { control: 'boolean' },
    maxFiles: { control: 'number' },
  },

  parameters: {
    docs: {
      description: {
        component: registryItem.description,
      },
    },
  },
} satisfies Meta<typeof FileUpload.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: FileUploadDefaultSource,
      },
    },
  },

  render: args => ({
    components: { FileUploadDefaultStory },

    setup() {
      return { args }
    },

    template: html`
      <FileUploadDefaultStory v-bind="args" />
    `,
  }),
}
