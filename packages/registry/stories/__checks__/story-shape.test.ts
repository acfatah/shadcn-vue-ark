import { describe, expect, it } from 'vitest'

import { CONFORMANT } from './conformant'

/*
  Structural consistency check for ui story files. Asserts the conventions that
  have no compiler link (title shape, autodocs tag, single Default export, the
  registryItem.description bridge, no orphan *Story.vue, ?raw pairing, Demo
  last). Components in CONFORMANT fail CI on any violation; all others are
  report-only so the gate stays green and grows wave by wave.
*/

// Raw source of every ui story file, keyed by module path.
const storySources = import.meta.glob('../components/ui/*/*.stories.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Every *.vue under ui story dirs, used to detect orphans (a .vue not
// imported by any story file in its dir).
const vuePaths = Object.keys(
  import.meta.glob('../components/ui/*/*.vue'),
)

function fileOf(path: string): string {
  return path.replace(/^.*\//, '')
}

function componentOf(path: string): string {
  return path.replace(/^.*\/ui\/([^/]+)\/.*$/, '$1')
}

// Group story sources and vue files by component dir.
interface Unit {
  component: string
  sources: string[]
  vueFiles: string[]
}

const units = new Map<string, Unit>()

for (const [path, source] of Object.entries(storySources)) {
  const component = componentOf(path)
  const unit = units.get(component) ?? { component, sources: [], vueFiles: [] }
  unit.sources.push(source)
  units.set(component, unit)
}

for (const path of vuePaths) {
  const component = componentOf(path)
  const unit = units.get(component)
  if (unit)
    unit.vueFiles.push(fileOf(path))
}

function violationsFor(unit: Unit): string[] {
  const problems: string[] = []
  const src = unit.sources.join('\n')

  if (!/title:\s*['"`]Components\/UI\//.test(src))
    problems.push('title is not "Components/UI/<Name>"')

  if (!/tags:\s*\[[^\]]*['"`]autodocs['"`]/.test(src))
    problems.push('meta is missing tags: [\'autodocs\']')

  if (!/export\s+const\s+Default\b/.test(src))
    problems.push('missing a `Default` export')

  if (!/registryItem\.description/.test(src))
    problems.push('docs description is not sourced from registryItem.description')

  // Orphan + ?raw pairing: every *Story.vue must be imported by the story
  // file, and variant *Story.vue files must also be imported with ?raw.
  for (const vue of unit.vueFiles) {
    if (!src.includes(vue))
      problems.push(`orphan story file not imported: ${vue}`)
    else if (/Story\.vue$/.test(vue) && !src.includes(`${vue}?raw`))
      problems.push(`missing ?raw source import for: ${vue}`)
  }

  // Demo (if present) must be the last exported story.
  const exportNames = [...src.matchAll(/export\s+const\s+(\w+)/g)].map(m => m[1])
  const demoIndex = exportNames.findIndex(n => n === 'Demo')
  if (demoIndex !== -1 && demoIndex !== exportNames.length - 1)
    problems.push('Demo export is not last')

  return problems
}

describe('story shape', () => {
  const sorted = [...units.values()].sort((a, b) =>
    a.component.localeCompare(b.component))

  for (const unit of sorted) {
    const problems = violationsFor(unit)
    const enforced = CONFORMANT.includes(unit.component)

    it(`${unit.component}${enforced ? '' : ' (report-only)'}`, () => {
      if (enforced) {
        expect(problems, problems.join('; ')).toEqual([])
      }
      else if (problems.length) {
        console.warn(`[story-shape] ${unit.component}: ${problems.join('; ')}`)
      }
    })
  }
})
