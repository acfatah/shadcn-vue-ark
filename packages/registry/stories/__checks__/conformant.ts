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
]
