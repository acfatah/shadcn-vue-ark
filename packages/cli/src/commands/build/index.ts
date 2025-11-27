import type { RegistryItem } from 'shadcn/schema'
import { Command } from 'commander'
import { consola } from 'consola'
import process from 'node:process'
import { join, resolve } from 'pathe'
import {
  readDirectory,
  rimraf,
  writeFile,
} from '@/utils'
import { buildIndexJson } from './build-index-json'
import { buildUIRegistry } from './build-ui-registry'

import mainPackageJson from '../../../../../package.json' assert { type: 'json' }

interface BuildCommandOptions {
  output: string
  name: string
  homepage: string
  registryBaseUrl: string
  dryRun: boolean
}

const ROOT_PATH = join(__dirname, '..', '..', '..', '..', 'registry')
export const REGISTRY_PATH = join('src')
export const REGISTRY_OUTPUT_PATH = join(ROOT_PATH, 'public', 'r')
export const UI_PATH = join(REGISTRY_PATH, 'components', 'ui')
export const BLOCKS_PATH = join(REGISTRY_PATH, 'blocks')

async function crawlAndBuildUIRegistry(registryBaseUrl: string) {
  const path = resolve(ROOT_PATH, UI_PATH)
  const dir = await readDirectory(path, { recursive: true, withFileTypes: true })
  const uiRegistry: RegistryItem[] = []

  for (const dirent of dir) {
    if (!dirent.isDirectory())
      continue

    const componentPath = resolve(ROOT_PATH, UI_PATH, dirent.name)
    const registryItem = await buildUIRegistry(componentPath, dirent.name, registryBaseUrl)
    uiRegistry.push(registryItem)
  }

  return uiRegistry
}

export async function buildRegistry(registryBaseUrl: string) {
  const registry: RegistryItem[] = []

  const [ui] = await Promise.all([
    crawlAndBuildUIRegistry(registryBaseUrl),
  ])

  registry.push(
    ...ui,
  )

  return registry.sort(
    (a, b) => a.name.localeCompare(b.name),
  )
}

async function runShadcnBuild() {
  await Bun.$`bunx --bun shadcn build -c ${ROOT_PATH} -o ${REGISTRY_OUTPUT_PATH}`
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
    '-u, --registry-base-url <registryBaseUrl>',
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
    let items: RegistryItem[]

    try {
      consola.start('Creating registry.json file...')
      items = await buildRegistry(opts.registryBaseUrl)

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
      await runShadcnBuild()
      consola.success('Registry built successfully.')
    }
    catch (error) {
      consola.error(error)
      process.exit(1)
    }
  })
