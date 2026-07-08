import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { CustomizerConfig } from './lib/config'

import Customizer from './Customizer.vue'
import { encodePreset } from './lib/preset'

// Stub the heavy preview so the test only exercises the control chrome.
function mountCustomizer(initialConfig: CustomizerConfig) {
  return mount(Customizer, {
    props: { initialConfig },
    global: { stubs: { PreviewRoot: true, PreviewShowcase: true } },
  })
}

describe('customizer', () => {
  it('normalizes an initial theme that is invalid for its base color', () => {
    // zinc is a base color not offered for the stone base color.
    const wrapper = mountCustomizer({
      baseColor: 'stone',
      theme: 'zinc',
      radius: 'default',
    })

    // Theme falls back to the base color: the stone swatch is active...
    expect(wrapper.get('[aria-label="stone"]').attributes('aria-pressed')).toBe(
      'true',
    )
    // ...the invalid zinc theme swatch is not even offered...
    expect(wrapper.find('[aria-label="zinc"]').exists()).toBe(false)
    // ...and the preset code reflects the normalized theme, not zinc.
    expect(wrapper.text()).toContain(
      `--preset ${encodePreset({ baseColor: 'stone', theme: 'stone', radius: 'default' })}`,
    )
  })

  it('keeps a valid initial config as-is', () => {
    const wrapper = mountCustomizer({
      baseColor: 'neutral',
      theme: 'blue',
      radius: 'medium',
    })

    expect(wrapper.get('[aria-label="blue"]').attributes('aria-pressed')).toBe(
      'true',
    )
  })

  it('normalizes the theme when a loaded preset has a mismatched combo', async () => {
    const wrapper = mountCustomizer({
      baseColor: 'neutral',
      theme: 'blue',
      radius: 'default',
    })
    // A code that decodes to the invalid combo stone + zinc.
    const code = encodePreset({
      baseColor: 'stone',
      theme: 'zinc',
      radius: 'default',
    })

    await wrapper.get('#load-preset').setValue(code)
    await wrapper.get('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.get('[aria-label="stone"]').attributes('aria-pressed')).toBe(
      'true',
    )
    expect(wrapper.find('[aria-label="zinc"]').exists()).toBe(false)
  })

  it('keeps exactly one theme selected after shuffle', async () => {
    const wrapper = mountCustomizer({
      baseColor: 'neutral',
      theme: 'blue',
      radius: 'default',
    })
    const shuffle = wrapper.findAll('button').find(b => b.text() === 'Shuffle')!

    await shuffle.trigger('click')
    await wrapper.vm.$nextTick()

    const pressed = wrapper
      .get('[aria-label="Theme"]')
      .findAll('button')
      .filter(b => b.attributes('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
  })
})
