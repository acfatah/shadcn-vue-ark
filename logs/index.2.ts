import type { RegistryItem } from 'shadcn/schema'
import { Command } from 'commander'
import { consola } from 'consola'
// import { existsSync } from 'node:fs'
import process from 'node:process'
import { join, resolve } from 'pathe'
import {
  // parseComment,
  readDirectory,
  // readFile,
  rimraf,
  writeFile,
} from '../packages/cli/src/utils'
// import { buildBlocksRegistry } from './build-blocks-registry'
// import { buildComponentsRegistry } from './build-components-registry'
// import { buildIcons } from './build-icons'
import { buildIndexJson } from '../packages/cli/src/commands/build/build-index-json'
// import { buildStyles } from './build-styles'
// import { buildThemes } from './build-themes'
import { buildUIRegistry } from '../packages/cli/src/commands/build/build-ui-registry'
// import { getFileDependencies } from './get-file-dependecies'

import mainPackageJson from '../package.json' assert { type: 'json' }

interface BuildCommandOptions {
  output: string
  name: string
  homepage: string
  registryPath: string
  dryRun: boolean
}

const ROOT_PATH = join(__dirname, '..', '..', '..', '..', 'registry')
export const REGISTRY_PATH = join('src')
export const REGISTRY_OUTPUT_PATH = join(ROOT_PATH, 'public', 'r')
export const UI_PATH = join(REGISTRY_PATH, 'components', 'ui')
// export const COMPONENTS_PATH = join(REGISTRY_PATH, 'components')
// export const BLOCKS_PATH = join(REGISTRY_PATH, 'blocks')
// const LIB_PATH = join(REGISTRY_PATH, 'lib')
// const COMPOSABLES_PATH = join(REGISTRY_PATH, 'composables')

async function crawlAndBuildUIRegistry() {
  const path = resolve(ROOT_PATH, UI_PATH)
  const dir = await readDirectory(path, { recursive: true, withFileTypes: true })
  const uiRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = resolve(ROOT_PATH, UI_PATH, dirent.name)
    const registryItem = await buildUIRegistry(componentPath, dirent.name)
    uiRegistry.push(registryItem)
  }

  return uiRegistry
}

// async function crawlComponents() {
//   const path = resolve(ROOT_PATH, COMPONENTS_PATH)
//   const dir = await readDirectory(path, { withFileTypes: true })
//   const componentsRegistry: RegistryItem[] = []

//   for (const dirent of dir) {
//     if (!dirent.isFile() || !dirent.name.endsWith('.vue'))
//       continue

//     const component = await buildComponentsRegistry(dirent.name)

//     if (component)
//       componentsRegistry.push(component)
//   }

//   return componentsRegistry
// }

// async function crawlBlock() {
//   const path = resolve(ROOT_PATH, BLOCKS_PATH)
//   const dir = await readDirectory(path, { withFileTypes: true })
//   const registry: RegistryItem[] = []

//   for (const dirent of dir) {
//     const blockPath = `${path}/${dirent.name}`

//     if (!dirent.isFile()) {
//       // Skip directories that don't have metadata.ts
//       if (!existsSync(`${blockPath}/metadata.ts`))
//         continue

//       const result = await buildBlocksRegistry(
//         blockPath,
//         dirent.name,
//       )

//       if (result && result.files.length) {
//         registry.push(result)
//       }

//       continue
//     }

//     // Skip non-vue files
//     if (!dirent.name.endsWith('.vue'))
//       continue

//     // Process single file block as a component
//     const component = await buildComponentsRegistry(dirent.name)

//     if (component)
//       registry.push(component)
//   }

//   return registry
// }

// async function crawlLib() {
//   const type = `registry:lib` as const
//   const path = resolve(ROOT_PATH, LIB_PATH)
//   const dir = await readDirectory(path, { withFileTypes: true })
//   const registry: RegistryItem[] = []

//   for (const dirent of dir) {
//     if (!dirent.name.endsWith('.ts') || !dirent.isFile())
//       continue

//     const [name] = dirent.name.split('.ts') as [string]
//     const kebabName = dirent.name.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()
//     const filepath = join(path, kebabName)
//     const source = await readFile(filepath, { encoding: 'utf8' })
//     const relativePath = join(LIB_PATH, kebabName)
//     const target = join('~', 'src', 'lib', kebabName)

//     const file = {
//       path: relativePath,
//       // content: source,
//       type,
//       target,
//     }

//     const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)
//     const [title, description] = await parseComment(filepath)

//     registry.push({
//       name,
//       type,
//       title,
//       description,
//       files: [file],
//       registryDependencies: Array.from(registryDependencies),
//       dependencies: Array.from(dependencies),
//     })
//   }

//   return registry
// }

// async function crawlComposables() {
//   /**
//    * `hook` is known as composable in Vue with a more fine-grained reactivity system.
//    * - https://vuejs.org/guide/reusability/composables.html#what-is-a-composable
//    * - https://vuejs.org/guide/reusability/composables.html#vs-react-hooks
//    * - https://vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks
//    */
//   const type = `registry:hook` as const

//   const path = resolve(ROOT_PATH, COMPOSABLES_PATH)
//   const dir = await readDirectory(path, { withFileTypes: true })
//   const registry: RegistryItem[] = []

//   for (const dirent of dir) {
//     if (!dirent.name.endsWith('.ts') || !dirent.isFile())
//       continue

//     const [name] = dirent.name.split('.ts') as [string]
//     const kebabName = dirent.name.replace(/\B([A-Z][a-z])/g, `-$1`).toLowerCase()
//     const filepath = join(path, kebabName)
//     const source = await readFile(filepath, { encoding: 'utf8' })
//     const relativePath = join(COMPOSABLES_PATH, kebabName)
//     const target = join('~', 'src', 'composables', kebabName)

//     const file = {
//       path: relativePath,
//       // content: source,
//       type,
//       target,
//     }

//     const { dependencies, registryDependencies } = await getFileDependencies(filepath, source)
//     const [title, description] = await parseComment(filepath)

//     registry.push({
//       name,
//       type,
//       title,
//       description,
//       files: [file],
//       registryDependencies: Array.from(registryDependencies),
//       dependencies: Array.from(dependencies),
//     })
//   }

//   return registry
// }

export async function buildRegistry() {
  const registry: RegistryItem[] = []

  // const [ui, components, blocks, lib, composables] = await Promise.all([
  const [ui] = await Promise.all([
    crawlAndBuildUIRegistry(),
    // crawlComponents(),
    // crawlBlock(),
    // crawlLib(),
    // crawlComposables(),
  ])

  registry.push(
    ...ui,
    // ...components,
    // ...blocks,
    // ...lib,
    // ...composables,
  )

  return registry.sort(
    (a, b) => a.name.localeCompare(b.name),
  )
}

async function runShadcnVueBuild() {
  // await Bun.$`bunx --bun shadcn-vue build`
  console.warn('TBD: run shadcn build command')
}

export const build = new Command()
  .name('build')
  .description('Build components registry.')
  .option(
    '-o, --output <path>',
    'destination directory for json files',
    './public/r',
  )
  .option(
    '-n, --name <name>',
    'name of the registry',
    mainPackageJson.name,
  )
  .option(
    '-h, --homepage <homepage>',
    'homepage url for the registry',
    mainPackageJson.homepage,
  )
  .option(
    '-u, --registry-path <registryPath>',
    'base url for the registry assets',
    `${mainPackageJson.homepage}/blob/main/packages/registry/r`,
  )
  .option(
    '--dry-run',
    'only generate registry.json file without building the registry',
    false,
  )
  .action(async (_cmd, args) => {
    const opts = args.opts() as BuildCommandOptions
    if (!process.env.REGISTRY_PATH) {
      throw new Error('REGISTRY_PATH is required to generate registry url')
    }

    let items: RegistryItem[]

    try {
      consola.start('Creating registry.json file...')
      items = await buildRegistry()

      const registrySchema = {
        $schema: 'https://ui.shadcn.com/schema/registry.json',
        name: opts.name,
        homepage: opts.homepage,
        items,
      }

      await writeFile(
        join(ROOT_PATH, 'registry.json'),
        `${JSON.stringify(registrySchema, null, 2)}\n`,
      )

      consola.success('Registry created successfully.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }

    if (args.dryRun)
      return

    try {
      consola.start('Building registry...')
      await rimraf(REGISTRY_OUTPUT_PATH)
      await buildIndexJson(items)
      // await buildThemes()
      // await buildStyles()
      // await buildIcons()
      await runShadcnVueBuild()
      consola.success('Registry built successfully.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })
