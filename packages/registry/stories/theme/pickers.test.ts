import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { getThemesForBaseColor } from './lib/config'
import BaseColorPicker from './pickers/BaseColorPicker.vue'
import RadiusPicker from './pickers/RadiusPicker.vue'
import ThemePicker from './pickers/ThemePicker.vue'

describe('baseColorPicker', () => {
  it('renders the four base colors and marks the selected one', () => {
    const wrapper = mount(BaseColorPicker, { props: { modelValue: 'zinc' } })
    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(4)
    const pressed = buttons.filter(b => b.attributes('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(pressed[0]!.text()).toContain('zinc')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(BaseColorPicker, { props: { modelValue: 'neutral' } })
    // Order is [neutral, stone, zinc, gray].
    await wrapper.findAll('button')[2]!.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['zinc'])
  })
})

describe('themePicker', () => {
  it('offers only themes valid for the base color', () => {
    const wrapper = mount(ThemePicker, {
      props: { modelValue: 'stone', baseColor: 'stone' },
    })
    const buttons = wrapper.findAll('button')
    const labels = buttons.map(b => b.attributes('aria-label'))

    expect(buttons).toHaveLength(getThemesForBaseColor('stone').length)
    expect(labels).toContain('stone')
    expect(labels).toContain('blue')
    expect(labels).not.toContain('zinc')
    expect(labels).not.toContain('neutral')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(ThemePicker, {
      props: { modelValue: 'neutral', baseColor: 'neutral' },
    })
    const blue = wrapper
      .findAll('button')
      .find(b => b.attributes('aria-label') === 'blue')!
    await blue.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['blue'])
  })
})

describe('radiusPicker', () => {
  it('renders five options and emits the chosen one', async () => {
    const wrapper = mount(RadiusPicker, { props: { modelValue: 'default' } })
    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(5)
    // Order is [default, none, small, medium, large].
    await buttons[4]!.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['large'])
  })
})
