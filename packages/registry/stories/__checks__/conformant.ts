/*
  Components brought up to the comprehensive-story bar.

  Listed components are STRICTLY enforced by the story-shape and argTypes-drift
  checks: CI fails on any violation. Components NOT listed are report-only
  (console.warn), so the gate lands green and grows wave by wave.

  Add a component's kebab name here once its story dir passes the bar. See
  PLAN-Storybook-Comprehensive-Stories.md.
*/
export const CONFORMANT: string[] = [
  // Wave 1 (pilot): 'badge', 'switch', 'dialog', 'data-table'
  'badge',
  'switch',
  'dialog',
  'data-table',

  // Wave 2 (T1 simple primitives)
  'alert',
  'aspect-ratio',
  'avatar',
  'button',
  'card',
  'description',
  'empty',
  'item',
  'kbd',
  'label',
  'separator',
  'skeleton',
  'spinner',
  'timeline',

  // Wave 3 (T2 compound in-flow)
  'accordion',
  'breadcrumb',
  'button-group',
  'checkbox',
  'collapsible',
  'field',
  'fieldset',
  'input-group',
  'pagination',
  'progress',
  'radio-group',
  'scroll-area',
  'slider',
  'table',
  'tabs',
  'toggle',
  'toggle-group',

  // Wave 4 (T3 overlay / portal)
  'combobox',
  'command',
  'context-menu',
  'drawer',
  'dropdown-menu',
  'hover-card',
  'menubar',
  'navigation-menu',
  'popover',
  'select',
  'sheet',
  'sonner',
  'tooltip',
]
