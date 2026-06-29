import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { boolArg, classArg, selectArg, stateArgs } from '../_helpers/args'
import { renderRaw } from '../_helpers/render'

/*
  Locks the authoring-helper contracts: `renderRaw` pins the ?raw source and
  merges extra parameters without dropping it, and the arg builders emit the
  expected control shapes. (A `defineStoryMeta` helper was prototyped and
  dropped in the pilot: a function-wrapped default export is not a static object
  literal, so Storybook's CSF indexer rejects it -- the meta head stays a
  literal. See PLAN section 20.)
*/

describe('renderRaw', () => {
  const Dummy = defineComponent({ name: 'Dummy' })

  type RenderFn = (args: Record<string, unknown>) => {
    components: Record<string, unknown>
    setup: () => { args: Record<string, unknown> }
    template: string
  }

  it('pins the raw source into the docs code panel', () => {
    const result = renderRaw(Dummy, '<Source />')

    expect(result.parameters?.docs?.source?.code).toBe('<Source />')
  })

  it('honors the source override escape hatch', () => {
    const result = renderRaw(Dummy, '<Source />', { source: '<Other />' })

    expect(result.parameters?.docs?.source?.code).toBe('<Other />')
  })

  it('carries a story description alongside the pinned source', () => {
    const result = renderRaw(Dummy, '<Source />', { description: 'Use it.' })

    expect(result.parameters?.docs?.source?.code).toBe('<Source />')
    expect(result.parameters?.docs?.description?.story).toBe('Use it.')
  })

  it('merges extra parameters without dropping the pinned source', () => {
    const result = renderRaw(Dummy, '<Source />', {
      parameters: { controls: { exclude: ['variant'] } },
    })

    expect(result.parameters?.docs?.source?.code).toBe('<Source />')
    expect(result.parameters?.controls?.exclude).toEqual(['variant'])
  })

  it('renders the component with v-bind="args"', () => {
    const result = renderRaw(Dummy, '<Source />')
    const rendered = (result.render as RenderFn)({ size: 'lg' })

    expect(rendered.components.Story).toBe(Dummy)
    expect(rendered.template).toContain('v-bind="args"')
    expect(rendered.setup().args).toEqual({ size: 'lg' })
  })
})

describe('arg builders', () => {
  it('boolArg produces a boolean control', () => {
    expect(boolArg()).toEqual({ control: { type: 'boolean' } })
    expect(boolArg('toggle it')).toMatchObject({ description: 'toggle it' })
  })

  it('selectArg produces a select with options and a default', () => {
    const arg = selectArg(['sm', 'md', 'lg'], 'md')

    expect(arg.control).toEqual({ type: 'select' })
    expect(arg.options).toEqual(['sm', 'md', 'lg'])
    expect(arg).toHaveProperty('table.defaultValue.summary', 'md')
  })

  it('classArg produces a styling-grouped text control', () => {
    const arg = classArg()

    expect(arg.control).toEqual({ type: 'text' })
    expect(arg.table.category).toBe('styling')
  })

  it('stateArgs builds one boolean control per state', () => {
    const args = stateArgs(['invalid', 'disabled', 'loading'])

    expect(Object.keys(args)).toEqual(['invalid', 'disabled', 'loading'])
    expect(args.invalid).toEqual({ control: { type: 'boolean' } })
  })
})
