/*
  Vitest browser-mode setup for the `storybook` project.

  Applies the project's preview annotations (theme + direction decorators, Pinia
  setup, viewports, a11y defaults) and the a11y addon to every story test, then
  runs Storybook's beforeAll hook.

  Do NOT remove this despite addon-vitest's "you can safely remove
  setProjectAnnotations" notice: with this version (10.4.x) the automatic
  provisioning does not actually apply the annotations, so removing the call
  makes composeStory fail for every story import (verified: 137/137 tests fail).
*/
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/vue3-vite'
import { beforeAll } from 'vitest'

import * as previewAnnotations from './preview'

const annotations = setProjectAnnotations([
  previewAnnotations,
  a11yAddonAnnotations,
])

beforeAll(annotations.beforeAll)
