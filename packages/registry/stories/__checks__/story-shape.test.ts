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

// `defineStoryMeta` hard-codes the title + autodocs tag, but only when it
// actually builds the default-exported meta. Detection is tied to a
// `const meta = defineStoryMeta(` or `export default defineStoryMeta(` so a bare
// mention in a comment or string cannot disable the title/tags checks.
function buildsMetaWithHelper(src: string): boolean {
  return /(?:^|\n)\s*(?:export\s+default\s+|(?:export\s+)?const\s+meta\b[^\n=]*=\s*)defineStoryMeta\s*\(/
    .test(src)
}

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

  // A story built on `defineStoryMeta` satisfies the title + autodocs checks by
  // construction. The helper's own contract is verified in helpers.test.ts.
  const usesMetaHelper = buildsMetaWithHelper(src)

  if (!usesMetaHelper && !/title:\s*['"`]Components\/UI\//.test(src))
    problems.push('title is not "Components/UI/<Name>"')

  if (!usesMetaHelper && !/tags:\s*\[[^\]]*['"`]autodocs['"`]/.test(src))
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

  // Namespace (compound) convention: any story that declares `subcomponents`
  // is a compound component, so its primary tab must read the dotted public
  // name. Enforce the docsRoot alias and dotted subcomponent keys. Single
  // components declare no subcomponents and are exempt (their lone tab already
  // reads a correct standalone name).
  const subMatch = src.match(/subcomponents:\s*\{/)
  if (subMatch) {
    if (!/component:\s*docsRoot\(/.test(src)) {
      problems.push(
        'compound story must wrap its root in docsRoot(Foo.Root, \'Foo.Root\')',
      )
    }

    // Brace-balance the subcomponents object body, then flag any bare-identifier
    // key (flat key with a colon, or shorthand) -- keys must be dotted string
    // literals like 'Foo.Part'.
    const start = subMatch.index! + subMatch[0].length
    let depth = 1
    let i = start
    for (; i < src.length && depth > 0; i++) {
      if (src[i] === '{')
        depth++
      else if (src[i] === '}')
        depth--
    }
    const body = src.slice(start, i - 1)
    const hasFlatKey = body.split('\n').some((line) => {
      const t = line.trim()
      if (!t || t.startsWith('//') || t.startsWith('...'))
        return false
      // Dotted string-literal key -> ok.
      if (/^['"`][^"'.`]*\.[^"'`]*['"`]\s*:/.test(t))
        return false

      // Bare-identifier key (flat `Ident:` or shorthand `Ident,`/`Ident`).
      return /^[A-Z_$][\w$]*\s*[:,]/i.test(t) || /^[A-Z_$][\w$]*$/i.test(t)
    })
    if (hasFlatKey)
      problems.push('subcomponent keys must be dotted strings (\'Foo.Part\')')
  }

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

describe('buildsMetaWithHelper', () => {
  it('detects a helper-built default-exported meta', () => {
    expect(buildsMetaWithHelper('const meta = defineStoryMeta({ name: \'Badge\' })')).toBe(true)
    expect(buildsMetaWithHelper('const meta: Meta<typeof Badge> = defineStoryMeta({})')).toBe(true)
    expect(buildsMetaWithHelper('export default defineStoryMeta({ name: \'Badge\' })')).toBe(true)
  })

  it('ignores a bare mention in a comment or string', () => {
    expect(buildsMetaWithHelper('// TODO: adopt defineStoryMeta() later')).toBe(false)
    expect(buildsMetaWithHelper('const note = \'use defineStoryMeta() soon\'')).toBe(false)
  })
})
