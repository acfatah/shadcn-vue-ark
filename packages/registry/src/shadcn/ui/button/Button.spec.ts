import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Button from './Button.vue'

describe('button', () => {
  it('renders a <button> element by default', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('data-slot')).toBe('button')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['inline-flex', 'items-center', 'bg-primary']))
  })

  it('applies variant and size classes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'destructive', size: 'lg' },
      slots: { default: 'Delete' },
    })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['bg-destructive', 'hover:bg-destructive/90', 'h-10', 'px-6']),
    )
  })

  it('forwards attributes to the rendered element', () => {
    const wrapper = mount(Button, { attrs: { type: 'submit', disabled: '' } })

    expect(wrapper.attributes('type')).toBe('submit')
    expect(wrapper.attributes('disabled')).toBe('')
  })

  it('renders a custom tag when `asChild` is true', () => {
    const wrapper = mount(Button, {
      props: { as: 'a', asChild: true, class: 'custom-class' },
      attrs: { href: '#cta' },
      slots: { default: 'Learn more' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('#cta')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['custom-class', 'inline-flex']))
  })
})
