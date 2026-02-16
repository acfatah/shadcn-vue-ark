import { existsSync } from 'node:fs'
import { parseSync } from 'oxc-parser'
import { basename, dirname, extname, normalize, resolve } from 'pathe'
import { compileScript, parse } from 'vue/compiler-sfc'

import { getKebabName } from '@/utils'

import { COMPOSABLES_PATH, LIB_PATH } from './paths'

/**
 * Whitelisted dependencies and their peer dependencies in the form of:
 * ```
 * [Dependency, [...PeerDependencies]]
 * ```
 */
export const DEPENDENCIES: ReadonlyMap<string, readonly string[]> = new Map<string, string[]>([
  // [Dependency, [...PeerDependencies]]
  ['@ark-ui/vue', []],
  ['@iconify/vue', []],
  ['@tanstack/vue-table', []],
  ['@unovis/vue', ['@unovis/ts']],
  ['@vueuse/core', []],
  ['@vueuse/components', []],
  ['clsx', []],
  ['embla-carousel-vue', []],
  ['lucide-vue-next', []],
  ['tailwind-merge', []],
  ['vaul-vue', []],
  ['vee-validate', ['@vee-validate/zod', 'zod']],
  ['vue-sonner', []],
])

export const REGISTRY_DEPENDENCY = '@/'

const REGISTRY_RELATIVE_EXTENSIONS = ['.ts', '.vue']

function resolveRegistryDependency(
  importer: string,
  source: string,
  registryPath: string,
) {
  if (source?.startsWith(REGISTRY_DEPENDENCY) && !source.endsWith('.vue')) {
    const sourcePath = source.replace(REGISTRY_DEPENDENCY, '')
    const segments = sourcePath.split('/')
    const componentName = segments.slice(-1)[0] ?? ''
    const isComposable = segments[0] === 'composables'
    const registryName = isComposable
      ? componentName
      : getKebabName(componentName)

    return `${registryPath}/${registryName}.json`
  }

  if (!source.startsWith('./') && !source.startsWith('../'))
    return null

  const importerDir = dirname(importer)
  const candidates: string[] = []
  const hasExt = Boolean(extname(source))

  if (hasExt) {
    candidates.push(resolve(importerDir, source))
  }
  else {
    REGISTRY_RELATIVE_EXTENSIONS.forEach((ext) => {
      candidates.push(resolve(importerDir, `${source}${ext}`))
      candidates.push(resolve(importerDir, source, `index${ext}`))
    })
  }

  const resolvedPath = candidates.find(candidate => existsSync(candidate))
  if (!resolvedPath)
    return null

  const normalizedPath = normalize(resolvedPath)
  const normalizedComposables = normalize(COMPOSABLES_PATH)
  const normalizedLib = normalize(LIB_PATH)

  if (
    normalizedPath.startsWith(normalizedComposables)
    || normalizedPath.startsWith(normalizedLib)
  ) {
    const baseName = basename(resolvedPath).replace(/\.[^.]+$/, '')
    const isComposable = normalizedPath.startsWith(normalizedComposables)
    const name = isComposable ? baseName : getKebabName(baseName)

    return `${registryPath}/${name}.json`
  }

  return null
}

export async function getFileDependencies(
  filename: string,
  sourceCode: string,
  registryPath: string,
) {
  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()

  const populateDeps = (source: string) => {
    const peerDeps = DEPENDENCIES.get(source)
    // const taggedDeps = DEPENDENCIES_WITH_TAGS.get(source)
    if (peerDeps !== undefined) {
      // if (taggedDeps !== undefined)
      //   dependencies.add(taggedDeps)
      // else
      dependencies.add(source)
      peerDeps.forEach(dep => dependencies.add(dep))
    }

    const registryUrl = resolveRegistryDependency(filename, source, registryPath)
    if (registryUrl)
      registryDependencies.add(registryUrl)
  }

  if (filename.endsWith('.vue')) {
    const parsed = parse(sourceCode, { filename })
    if (parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content) {
      const compiled = compileScript(parsed.descriptor, { id: 'id' })

      Object.values(compiled.imports!).forEach((value) => {
        populateDeps(value.source)
      })
    }
  }

  if (filename.endsWith('.ts')) {
    const ast = parseSync(filename, sourceCode, {
      sourceType: 'module',
    })

    const modules = ast.module.staticImports

    modules.forEach((module: any) => {
      populateDeps(module.moduleRequest.value)
    })
  }

  return { registryDependencies, dependencies }
}
