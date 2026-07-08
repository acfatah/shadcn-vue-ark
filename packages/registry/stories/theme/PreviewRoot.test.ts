import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { CustomizerConfig } from './lib/config'

import { buildThemeVars } from './lib/build-theme-vars'
import PreviewRoot from './PreviewRoot.vue'

const config: CustomizerConfig = {
  baseColor: 'zinc',
  theme: 'blue',
  radius: 'large',
}

describe('previewRoot', () => {
  it('injects a wrapper-scoped <style> with merged light and dark vars', () => {
    const wrapper = mount(PreviewRoot, { props: { config } })
    const root = wrapper.get('[data-preview-root]')
    const scopeId = root.attributes('data-preview-root')!
    const css = wrapper.get('style').element.textContent ?? ''
    const { light, dark } = buildThemeVars(config)

    expect(css).toContain(`[data-preview-root="${scopeId}"] {`)
    expect(css).toContain(`[data-preview-root="${scopeId}"].dark {`)
    // Scoped: the preview never bleeds into :root / the docs chrome.
    expect(css).not.toContain(':root')
    // Real merged values landed.
    expect(css).toContain(`--primary: ${light.primary};`)
    expect(css).toContain('--radius: 0.875rem;')
    expect(css).toContain(`--background: ${dark.background};`)
  })

  it('applies the dark class and color-scheme from the dark prop', async () => {
    const wrapper = mount(PreviewRoot, { props: { config, dark: false } })
    const root = wrapper.get('[data-preview-root]')

    expect(root.classes()).not.toContain('dark')

    await wrapper.setProps({ dark: true })
    expect(root.classes()).toContain('dark')
  })

  it('recomputes the vars when the config changes', async () => {
    const wrapper = mount(PreviewRoot, {
      props: {
        config: { baseColor: 'neutral', theme: 'neutral', radius: 'default' },
      },
    })
    expect(wrapper.get('style').element.textContent).toContain(
      '--radius: 0.625rem;',
    )

    await wrapper.setProps({
      config: { baseColor: 'neutral', theme: 'neutral', radius: 'large' },
    })
    expect(wrapper.get('style').element.textContent).toContain(
      '--radius: 0.875rem;',
    )
  })

  it('gives each preview in the same app a unique scope id', () => {
    const Parent = {
      components: { PreviewRoot },
      setup: () => ({ config }),
      template:
        '<div><PreviewRoot :config="config" /><PreviewRoot :config="config" /></div>',
    }
    const wrapper = mount(Parent)
    const ids = wrapper
      .findAll('[data-preview-root]')
      .map(el => el.attributes('data-preview-root'))

    expect(ids).toHaveLength(2)
    expect(ids[0]).not.toBe(ids[1])
  })
})
