import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { CustomizerConfig } from './lib/config'

import ExportPanel from './ExportPanel.vue'
import { encodePreset } from './lib/preset'

const config: CustomizerConfig = {
  baseColor: 'neutral',
  theme: 'blue',
  radius: 'medium',
}

describe('exportPanel', () => {
  it('shows the live preset code for the config', () => {
    const wrapper = mount(ExportPanel, { props: { config } })

    expect(wrapper.text()).toContain(`--preset ${encodePreset(config)}`)
  })

  it('emits apply with the decoded config on a valid load', async () => {
    const wrapper = mount(ExportPanel, { props: { config } })
    const target: CustomizerConfig = {
      baseColor: 'zinc',
      theme: 'rose',
      radius: 'large',
    }

    await wrapper.get('#load-preset').setValue(encodePreset(target))
    await wrapper.get('form').trigger('submit')

    expect(wrapper.emitted('apply')?.[0]?.[0]).toEqual(target)
  })

  it('shows an error and does not emit on an invalid load', async () => {
    const wrapper = mount(ExportPanel, { props: { config } })

    await wrapper.get('#load-preset').setValue('not-a-code!!')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.emitted('apply')).toBeUndefined()
    expect(wrapper.get('[role="alert"]').text().toLowerCase()).toContain(
      'invalid',
    )
    // The invalid field is marked and linked to its error for AT.
    const input = wrapper.get('#load-preset')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe(
      wrapper.get('[role="alert"]').attributes('id'),
    )
  })

  it('announces copy success via a polite status region', async () => {
    const wrapper = mount(ExportPanel, { props: { config } })
    const copyCode = wrapper.findAll('button').find(b => b.text() === 'Copy')!

    await copyCode.trigger('click')

    expect(wrapper.get('[role="status"]').text()).toContain('Copied')
  })

  it('emits apply with a config on shuffle', async () => {
    const wrapper = mount(ExportPanel, { props: { config } })
    const shuffle = wrapper
      .findAll('button')
      .find(b => b.text() === 'Shuffle')!

    await shuffle.trigger('click')

    expect(wrapper.emitted('apply')?.[0]?.[0]).toBeTruthy()
  })
})
