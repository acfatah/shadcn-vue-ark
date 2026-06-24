import { existsSync } from 'node:fs'
import { join } from 'pathe'

import { readDirectory, readFile, writeFile } from '@/cli/utils'

import { PUBLIC_STORIES_PATH, STORIES_UI_PATH, UI_PATH } from './paths'

interface StoryBundleFile {
  path: string
  content: string
}

interface StoryBundle {
  name: string
  type: 'registry:stories'
  files: StoryBundleFile[]
}

// Skip numbered backup files (e.g. `SelectDefaultStory.0.vue`), matching the
// rule applied to component sources in `build-ui-registry.ts`.
const NUMBERED_BACKUP = /\.\d+\./

// Strip the `shadcn/schema` type wiring so the emitted `_registry.ts` is valid
// in a consumer app that does not depend on `shadcn`. Stories only read
// `registryItem.description`/`title`, so a plain object export is enough.
function toConsumerSafeRegistry(source: string) {
  return source
    .replace(/^import type \{ RegistryItem \} from 'shadcn\/schema'\n+/m, '')
    .replace(/ satisfies RegistryItem/g, '')
}

// Rewrite the alias import of the component's `_registry` to a local relative
// import so the whole bundle is self-contained within `src/stories/<name>/`.
// Deleting that staging folder then removes everything the fetch added.
function rewriteRegistryImport(source: string, componentName: string) {
  return source.split(`@/components/ui/${componentName}/_registry`).join('./_registry')
}

async function buildStoryBundle(componentName: string): Promise<StoryBundle | null> {
  const componentStoriesPath = join(STORIES_UI_PATH, componentName)
  const dir = await readDirectory(componentStoriesPath, { withFileTypes: true })

  const rawFiles: StoryBundleFile[] = []
  let importsRegistry = false

  for (const dirent of dir) {
    if (!dirent.isFile())
      continue

    if (NUMBERED_BACKUP.test(dirent.name))
      continue

    const source = await readFile(join(componentStoriesPath, dirent.name))

    if (source.includes(`@/components/ui/${componentName}/_registry`))
      importsRegistry = true

    rawFiles.push({ path: dirent.name, content: source })
  }

  if (rawFiles.length === 0)
    return null

  const registryPath = join(UI_PATH, componentName, '_registry.ts')
  const includeRegistry = importsRegistry && existsSync(registryPath)

  const files: StoryBundleFile[] = rawFiles.map(file => ({
    path: file.path,
    content: includeRegistry
      ? rewriteRegistryImport(file.content, componentName)
      : file.content,
  }))

  if (includeRegistry) {
    files.push({
      path: '_registry.ts',
      content: toConsumerSafeRegistry(await readFile(registryPath)),
    })
  }

  files.sort((a, b) => a.path.localeCompare(b.path))

  return {
    name: componentName,
    type: 'registry:stories',
    files,
  }
}

// Emit one self-contained story bundle per UI component to `public/stories/`,
// plus an `index.json` listing the components that have bundles. The app's
// `ui add` command fetches these by name and drops them into `src/stories/`.
export async function buildStoriesBundles() {
  const dir = await readDirectory(STORIES_UI_PATH, { withFileTypes: true })
  const names: string[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const bundle = await buildStoryBundle(dirent.name)

    if (!bundle)
      continue

    await writeFile(
      join(PUBLIC_STORIES_PATH, `${bundle.name}.json`),
      `${JSON.stringify(bundle, null, 2)}\n`,
    )

    names.push(bundle.name)
  }

  names.sort()

  await writeFile(
    join(PUBLIC_STORIES_PATH, 'index.json'),
    `${JSON.stringify(names, null, 2)}\n`,
  )

  return names
}
