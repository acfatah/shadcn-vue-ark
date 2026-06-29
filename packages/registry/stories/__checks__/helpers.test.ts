import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { boolArg, classArg, selectArg, stateArgs } from '../_helpers/args'
import { defineStoryMeta } from '../_helpers/meta'
import { renderRaw } from '../_helpers/render'

/*
  Locks the authoring-helper contracts. The story-shape check trusts
  `defineStoryMeta` to set the title and autodocs tag, and `renderRaw` to pin
  the ?raw source, so those guarantees are asserted here rather than inferred.
*/

describe('defineStoryMeta', () => {
  const Dummy = defineComponent({ name: 'Dummy' })

  it('builds the Components/UI title and autodocs tag', () => {
    const meta = defineStoryMeta({ name: 'Badge', component: Dummy })

    expect(meta.title).toBe('Components/UI/Badge')
    expect(meta.tags).toContain('autodocs')
    expect(meta.component).toBe(Dummy)
  })

  it('pins the description into docs.description.component', () => {
    const meta = defineStoryMeta({
      name: 'Badge',
      component: Dummy,
      description: 'A badge.',
    })

    expect(meta.parameters?.docs?.description?.component).toBe('A badge.')
  })

  it('passes through subcomponents, argTypes, and extra parameters', () => {
    const Sub = defineComponent({ name: 'Sub' })
    const Root = defineComponent({ name: 'Root', props: { disabled: Boolean } })
    const meta = defineStoryMeta({
      name: 'Switch',
      component: Root,
      subcomponents: { 'Switch.Control': Sub },
      argTypes: { disabled: { control: 'boolean' } },
      parameters: { layout: 'centered' },
    })

    expect(meta.subcomponents).toEqual({ 'Switch.Control': Sub })
    expect(meta.argTypes).toHaveProperty('disabled')
    expect(meta.parameters?.layout).toBe('centered')
  })

  it('keeps the description when the caller also passes docs.* parameters', () => {
    const meta = defineStoryMeta({
      name: 'Badge',
      component: Dummy,
      description: 'A badge.',
      parameters: { docs: { toc: true } },
    })

    expect(meta.parameters?.docs?.description?.component).toBe('A badge.')
    expect(meta.parameters?.docs?.toc).toBe(true)
  })

  it('omits the docs description when none is given', () => {
    const meta = defineStoryMeta({ name: 'Badge', component: Dummy })

    expect(meta.parameters?.docs).toBeUndefined()
  })
})

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
