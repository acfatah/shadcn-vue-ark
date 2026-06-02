# AGENTS.md

## Priority order

1. Correctness and safety
2. Minimal diffs and existing project conventions
3. Workspace-aware execution
4. Style, formatting, and response conventions

## Conflict handling

- If rules conflict, follow the most specific section.
- Do not duplicate rules across sections.
- Keep this file up to date when conventions change.

---

## Repo orientation

Implementation of [shadcn/ui](https://ui.shadcn.com/) components using Vue 3 and
[Ark UI](https://ark-ui.com/). This repository is a Bun-powered monorepo
containing `apps/` and `packages/` workspaces. Use `bun` for installs and
running scripts.

### Structure

```text
.
├── README.md
├── apps
│   ├── storybook      # Component dev and visual testing (Storybook 10 + Vue3 + Vite)
│   └── web            # Documentation site (Astro + Starlight)
├── packages
│   ├── cli            # CLI tool for component installation
│   └── registry       # Core component library (main package)
├── scripts
├── templates          # Project starter templates
│   └── starter
├── .bun-version
├── package.json
└── tsconfig.json
```

### Developer workflows

Need to `cd` into the specific app or package to run scripts.

```bash
bun install              # Install dependencies
```

```bash
cd packages/registry
bun run registry:build   # Build the registry package
```

Common scripts:

- `bun run dev` — start development server
- `bun run build` — build
- `bun run lint` — lint
- `bun run format [..files]` — fix lint issues
- `bun run typecheck` — TypeScript type checking
- `bun run test` — run tests (vitest)
- `bun run test:watch` — watch mode

Prefer to inspect each package's own `package.json` for workspace-specific
scripts.

### Registry package (`packages/registry`)

Components live in `src/components/ui/<name>/`. Each component folder contains:

- `<Name>.vue` — main component using `<script setup>`
- `types.ts` — props interface
- `variant.ts` — CVA variants (size, variant, etc.)
- `_registry.ts` — metadata for the shadcn CLI (`registryItem`)
- `index.ts` — re-exports

Key patterns:

- Headless behavior from **Ark UI** (built on Zag.js state machines)
- Styling via **Tailwind CSS v4** + **class-variance-authority (CVA)**
- `cn()` utility from `lib/utils.ts` (clsx + tailwind-merge)
- `useForwardPropsEmits`, `useForwardProps`, `reactiveOmit` from VueUse for
  prop forwarding
- `asChild` prop pattern for rendering as a custom element
- Use base element from `ark`. E.g. `import { ark } from '@ark-ui/vue'` and 
  `<ark.button>` for base elements.

Global styles and theming are in `src/styles/global.css` (24 color themes,
OKLch color space, dark mode via `.dark` class).

### Storybook app (`apps/storybook`)

Stories live in `stories/ui/<name>/`. Each component folder has:

- `<Name>.stories.ts` — story meta, argTypes, and named story exports
- `*Story.vue` — individual story variant components

The `@` alias in storybook Vite config points to `packages/registry/src`.

Bun workspace, e.g. `packages/registry`, are resolved using `packages.registry`
namespace in package imports.

---

## Agent first steps

When editing this repository:

1. Read `package.json`, `tsconfig.json`, and `README.md` at repo root.
2. Inspect `packages/<package>/package.json` for package-local scripts and
   dependencies.
3. If TypeScript changes are needed, prefer minimal `extends`-based overrides
   in package `tsconfig.json` instead of changing root compiler flags without
   clear requirement.
4. If a change touches workspace resolution or workspaces, verify and correct
   `workspace` globs in root `package.json`.

---

## Coding style

- Always fix lint errors as the last task, after all other tasks.
- Use `bun run format [..file]` to format code or files.
- ESLint uses `@antfu/eslint-config` via `eslint.config.ts`.

Important rules:

- Use spaces instead of tabs.
- Two-space indent.
- Single quotes.
- Alphabetized imports by file name with `perfectionist/sort-imports`.
- Empty line before `return`.
- Top-level functions should use `function` declarations.

Naming conventions:

- Vue components use PascalCase.
- Hooks/helpers/files use camelCase.
- Config keys use UPPER_SNAKE_CASE.

---

## Testing and verification

- Do not merge `Bun.env` and `process.env`.
- Find where dotenv files are located, `cd` into that directory, then run
  commands from there.
- Start with specific tests near changed code, then broaden.
- Do not fix unrelated broken tests.

---

## Documentation and comments

- Keep lines around 80 characters.
- Insert line breaks with correct indent to stay near 80 columns.
- Be concise and use bullets.
- Use fenced code blocks with explicit language (e.g. `yaml`) for code snippets
  and commands.
- Wrap inline commands, file paths, env vars, and identifiers in backticks.
- Use tables when helpful.

---

## Commit messages

- Use conventional commits:
  `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`.
- Use imperative mood: `add`, `fix`, `change`, `remove`.
- Always add scope based on workspace except for root:
  - `fix(registry): ...`
  - `feat(web): ...`
- Use directory names from `apps/` or `packages/` as scope.
- Limit subject line to 60 characters.
- Use body to explain what and why, not how.
- Use bullets in body when multiple points.
- Do not add co-authors unless explicitly asked.

---

## Response and output style

- Be concise and prioritize actionable guidance.
- Use What, Purpose, Benefit and How (actionable steps on how it works, etc.).
- Include tips, gotchas, and common pitfalls.
- Use short sections and bullets for scanability.
- Use tables when helpful.
- Use markdown formatting for code snippets and commands.
- Wrap commands, paths, env vars, and identifiers in backticks.
- Provide bash-ready commands in fenced blocks when giving steps.
- Prefer minimal diffs and preserve existing style when editing code.
- If creating multiple files or non-trivial code, include a short run/test
  snippet.
- Never use emojis unless explicitly asked.
- Avoid en dash and em dash characters.
