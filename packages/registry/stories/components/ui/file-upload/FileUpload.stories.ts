import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { html } from 'common-tags'

import { FileUpload } from '@/components/ui/file-upload'
import { registryItem } from '@/components/ui/file-upload/_registry'

import { docsRoot } from '../../../_helpers/docs-root'
import FileUploadDefaultStory from './FileUploadDefaultStory.vue'
import FileUploadDefaultSource from './FileUploadDefaultStory.vue?raw'

const meta: Meta<typeof FileUpload.Root> = {
  title: 'Components/UI/FileUpload',
  component: docsRoot(FileUpload.Root, 'FileUpload.Root'),
  subcomponents: {
    'FileUpload.Label': FileUpload.Label,
    'FileUpload.Dropzone': FileUpload.Dropzone,
    'FileUpload.Trigger': FileUpload.Trigger,
    'FileUpload.ItemGroup': FileUpload.ItemGroup,
    'FileUpload.Item': FileUpload.Item,
    'FileUpload.ItemPreview': FileUpload.ItemPreview,
    'FileUpload.ItemPreviewImage': FileUpload.ItemPreviewImage,
    'FileUpload.ItemName': FileUpload.ItemName,
    'FileUpload.ItemSizeText': FileUpload.ItemSizeText,
    'FileUpload.ItemDeleteTrigger': FileUpload.ItemDeleteTrigger,
    'FileUpload.ClearTrigger': FileUpload.ClearTrigger,
    'FileUpload.HiddenInput': FileUpload.HiddenInput,
  },
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
}

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
