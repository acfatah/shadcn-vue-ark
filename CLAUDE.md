# CLAUDE.md

Project conventions and agent instructions for the shadcn-vue-ark monorepo.
This is the single source of truth. Scope-specific rules live in nested
`CLAUDE.md` files that load automatically when you work in those directories:

- `packages/registry/CLAUDE.md` - authoring the component library
- `templates/vue-starter/CLAUDE.md` - the standalone starter app (not the monorepo)

## Priority order

1. Correctness and safety
2. Minimal diffs and existing project conventions
3. Workspace-aware execution
4. Style, formatting, and response conventions

## Conflict handling

- If rules conflict, follow the most specific section or the nearest `CLAUDE.md`
  (a nested file overrides the root within its directory).
- Do not duplicate rules across sections.
- Keep this file up to date when conventions change.

---

## Repo orientation

Implementation of [shadcn/ui](https://ui.shadcn.com/) components using Vue 3 and
[Ark UI](https://ark-ui.com/). A Bun-powered monorepo with `apps/` and
`packages/` workspaces. Use `bun` for installs and running scripts.

### Structure

```text
.
├── apps
│   └── web            # Documentation site (Astro + Starlight)
├── packages
│   ├── cli            # CLI tool for component installation
│   └── registry       # Core component library + Storybook (main package)
├── templates          # Standalone starter scaffolds (see note below)
│   └── vue-starter    # Distributable Vue 3 SPA that consumes the registry
├── scripts
├── docs               # CONTEXT / AUDIT / SUMMARY reference docs
├── package.json
└── tsconfig.json
```

Notes:

- Storybook is not a separate app; it lives inside `packages/registry`
  (`.storybook/` and `stories/`).
- `templates/*` are self-contained starter projects with a different audience
  and conventions. Treat each as its own scope: its `CLAUDE.md` governs work
  inside it, and monorepo rules (Storybook, registry authoring,
  `@antfu/eslint-config`) do NOT apply there. Do not run template scripts from
  the repo root.

### Developer workflows

`cd` into the specific app or package to run scripts.

```bash
bun install              # Install dependencies (run at repo root)
```

```bash
cd packages/registry
bun run registry:build   # Build the registry package
```

Common per-package scripts:

- `bun run dev` - start development server
- `bun run build` - build
- `bun run lint` - lint
- `bun run format [..files]` - fix lint issues
- `bun run typecheck` - TypeScript type checking
- `bun run test` - run tests (vitest)
- `bun run test:watch` - watch mode

Inspect each package's own `package.json` for workspace-specific scripts; for
example `packages/registry` uses `bun storybook` and `bun run registry:build`
rather than `dev` / `build`.

Gotcha: `bun run typecheck` uses plain `tsc`, which cannot see `.vue` files.
For Vue-aware checks run `bunx vue-tsc --noEmit` inside the package.

---

## Agent first steps

When editing this repository:

1. Read `package.json`, `tsconfig.json`, and `README.md` at repo root.
2. Inspect `packages/<package>/package.json` for package-local scripts and
   dependencies.
3. If TypeScript changes are needed, prefer minimal `extends`-based overrides in
   the package `tsconfig.json` instead of changing root compiler flags without a
   clear requirement.
4. If a change touches workspace resolution, verify and correct the `workspace`
   globs in root `package.json`.

When working in `packages/registry`, also read `packages/registry/CLAUDE.md` for
component authoring conventions.

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

- Vue components use PascalCase (`Button.vue`, `AccordionRoot.vue`).
- Composables use camelCase in `composables/` (`useForwardProps.ts`,
  `createContext.ts`).
- `lib/` utilities use kebab-case (`format-bytes.ts`, `use-fetch.ts`).
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
- Use fenced code blocks with explicit language (e.g. `yaml`) for snippets and
  commands.
- Wrap inline commands, file paths, env vars, and identifiers in backticks.
- Use tables when helpful.

---

## Commit messages

- Use conventional commits:
  `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`.
- Use imperative mood: `add`, `fix`, `change`, `remove`.
- Always add a scope based on the workspace, except for root-level changes:
  - `fix(registry): ...`
  - `feat(web): ...`
- Use directory names from `apps/` or `packages/` as scope.
- Limit the subject line to 60 characters.
- Use the body to explain what and why, not how.
- Use bullets in the body when there are multiple points.
- Do not add co-authors unless explicitly asked.

---

## Response and output style

- Be concise and prioritize actionable guidance.
- Use What, Purpose, Benefit, and How (actionable steps).
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
