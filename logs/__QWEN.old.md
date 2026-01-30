# Bun + Ark UI + Vue Component Registry Monorepo

## Project Overview

This is a modern component registry monorepo built using Bun as the JavaScript runtime, Ark UI for accessible components, and Vue.js for the frontend framework. The project implements a shadcn/ui-like component registry specifically for Vue 3 and Ark UI components.

The project follows a monorepo architecture with the following key components:

- **Core Technologies:**
  - **Bun** - Fast JavaScript runtime and package manager
  - **Vue.js 3** - Progressive frontend JavaScript framework
  - **Ark UI** - Accessible, framework-agnostic UI components
  - **TypeScript** - Superset of JavaScript that adds static typing
  - **Tailwind CSS** - Utility-first CSS framework for styling
  - **Storybook** - UI component development environment and documentation

- **Architecture:** Monorepo with workspaces containing apps and packages
  - `apps/`: Contains applications (storybook, web)
  - `packages/`: Contains reusable packages (registry, cli)
  - `scripts/`: Contains build and utility scripts
  - `templates/`: Contains component templates

## Project Structure

```
bun-ark-vue/
├── apps/
│   ├── storybook/    # Storybook application for component development
│   └── web/          # Production web application (Astro + Vue + Ark UI)
├── packages/
│   ├── cli/          # Command line interface for the component registry
│   └── registry/     # Core component registry library
├── scripts/          # Build and utility scripts
├── templates/        # Component templates for the registry
├── bun.lock          # Bun lock file
├── package.json      # Root package configuration
└── tsconfig.json     # TypeScript configuration
```

## Key Features

- **Component Registry:** A collection of accessible UI components built with Ark UI and Vue
- **CLI Tool:** Command line interface for adding, updating, and managing components
- **Storybook Integration:** Visual development environment for components
- **Modular Architecture:** Separation of concerns between registry, CLI, and applications
- **Type Safety:** Full TypeScript support throughout the codebase
- **Accessibility Focus:** Using Ark UI for WCAG-compliant components
- **Modern Build Tools:** Using Bun for fast builds and dependency management

## Building and Running

### Prerequisites

- Bun runtime must be installed on your system

### Setup and Commands

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Running Applications:**

   **Web Application (Astro + Vue):**
   ```bash
   cd apps/web
   bun dev
   ```
   This starts the local development server at `localhost:4321`

   **Storybook:**
   ```bash
   bun storybook  # or: cd apps/storybook && bun run dev
   ```
   This starts the Storybook server at `localhost:6006`

   **Build for production:**
   ```bash
   # Web application
   cd apps/web && bun build

   # Storybook
   bun storybook:build  # or: cd apps/storybook && bun run build
   ```

3. **Working with Packages:**

   **Registry Package:**
   ```bash
   cd packages/registry
   bun install
   bun test
   bun typecheck
   ```

   **CLI Package:**
   ```bash
   cd packages/cli
   bun install
   bun run build
   bun run cli  # Run the CLI in development mode
   ```

4. **General Commands:**
   ```bash
   # Linting across the monorepo
   bun lint
   bun lint:changed
   bun lint:staged

   # Formatting
   bun format
   bun format:changed
   bun format:staged

   # Type checking
   bun typecheck

   # Testing
   bun test
   bun test:watch
   ```

## Development Conventions

- **Code Style:** The project uses ESLint with the `@antfu/eslint-config` configuration for consistent code formatting and quality
- **Commit Messages:** Uses conventional commits with commitlint for standardized commit messages
- **Git Hooks:** Pre-commit hooks run linting and formatting checks
- **Type Safety:** Strict TypeScript configuration is enforced throughout the codebase
- **Component Development:** Components are built using Ark UI for accessibility and Vue 3 composition API
- **Styling:** Tailwind CSS is used for styling with utility-first approach
- **Testing:** Unit tests with Vitest (packages/registry)

## Key Dependencies

- `@ark-ui/vue` - Accessible Vue UI components
- `vue` - Vue.js 3 framework
- `tailwindcss` - Utility-first CSS framework
- `@antfu/eslint-config` - ESLint configuration
- `storybook` - UI component development environment
- `zod` - Schema validation library
- `shadcn` - Core library for the registry functionality
- `typescript` - TypeScript compiler and type checking

## Configuration Files

- `package.json` - Root package configuration with workspaces and scripts
- `tsconfig.json` - TypeScript configuration with project references
- `bun.lock` - Bun lock file for dependency management
- `apps/web/astro.config.mjs` - Astro framework configuration for web app
- `apps/storybook/vite.config.ts` - Vite configuration for Storybook
- `packages/registry/shadcn.config.ts` - Shadcn configuration for registry
- `.gitignore` - Git ignore patterns
- `.vscode/settings.json` - VSCode settings for consistent development environment

## Project Context

This project is an implementation of shadcn/ui-style component registry specifically for Vue 3 and Ark UI. It provides developers with a collection of pre-built, accessible components that can be easily integrated into their projects. The CLI tool allows developers to easily add components to their projects, while Storybook provides a development environment and documentation for the components.