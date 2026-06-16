/*
  Vitest browser-mode setup for the `storybook` project.

  Since Storybook 10.3, `@storybook/addon-vitest` auto-applies the project's
  preview annotations (theme decorator, Pinia setup, viewports, a11y defaults)
  to every story test, so no manual project-annotation call is needed here.
  Keep this file as the home for any additional browser-mode setup (custom
  matchers, global portal cleanup between stories).
*/
export {}
