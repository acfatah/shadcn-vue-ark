import { describe, expect, it } from 'vitest'

import { SLOT_ARGS as SLOT_ARG_NAMES, VUE_INTERNAL_ARGS } from '../_helpers/argtypes-ignore'
import { CONFORMANT } from './conformant'

/*
  argTypes vs real-props drift guard. The CONTEXT doc names argTypes/props
  drift the #1 failure mode, and there is no compiler link between them. For
  each CONFORMANT component this imports the story meta, reads the runtime
  props of `meta.component`, and asserts the argTypes keys equal the component's
  own declared props (minus the global ignore list and slot args).

  CONFORMANT is empty until the pilot lands, so this is inert (green) for now.
  Components opt in as they reach the bar; non-listed components are not checked
  here yet (a future report-all pass will surface the full backlog).
*/

// Vue-internal attrs disabled globally in preview.ts, plus common slot args.
// Sourced from the single ignore list shared with preview.ts.
const IGNORE = new Set<string>(VUE_INTERNAL_ARGS)
const SLOT_ARGS = new Set<string>(SLOT_ARG_NAMES)

const storyModules = import.meta.glob('../components/ui/*/*.stories.ts')

function moduleFor(component: string): (() => Promise<unknown>) | undefined {
  const hit = Object.entries(storyModules).find(([path]) =>
    path.includes(`/ui/${component}/`))

  return hit?.[1]
}

function propKeysOf(component: unknown): string[] {
  const props = (component as { props?: unknown })?.props

  if (!props)
    return []

  // Normalized SFC props are an object keyed by prop name; array form is keyed
  // by the prop strings themselves.
  return Array.isArray(props) ? (props as string[]) : Object.keys(props)
}

describe('argTypes vs props drift', () => {
  if (CONFORMANT.length === 0) {
    it('inert until components opt in (CONFORMANT is empty)', () => {
      expect(CONFORMANT).toEqual([])
    })

    return
  }

  for (const component of CONFORMANT) {
    it(component, async () => {
      const load = moduleFor(component)
      expect(load, `no *.stories.ts found for ${component}`).toBeTruthy()

      const mod = (await load!()) as { default: { argTypes?: Record<string, unknown>, component?: unknown } }
      const meta = mod.default

      const argTypeKeys = Object.keys(meta.argTypes ?? {})
        .filter(k => !IGNORE.has(k) && !SLOT_ARGS.has(k))

      const propKeys = propKeysOf(meta.component)
        .filter(k => !IGNORE.has(k))

      const phantom = argTypeKeys.filter(k => !propKeys.includes(k))
      const missing = propKeys.filter(k => !argTypeKeys.includes(k))

      expect(
        { phantom, missing },
        `argTypes drift for ${component}: phantom=[${phantom}] missing=[${missing}]`,
      ).toEqual({ phantom: [], missing: [] })
    })
  }
})
