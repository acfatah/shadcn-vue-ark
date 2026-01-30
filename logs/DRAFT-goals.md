# Goals

## Why am I making this project?

- Alternative to `shadcn-vue` which uses `Ark UI` for the headless primitives.
- To create customizable Vue components registry for long-term use
- Rapidly build a Design System for specific use cases

## Who is this project for?

- TBD

## What is gonna make it valuable?

- Latest shadcn/ui

---

# FAQ

## You copied `shadcn-vue`?

This is the implementation of the shadcn/ui components, similar to `shadcn-vue`
but uses `Ark UI` for the headless primitives.

## Why? There is already `shadcn-vue`

- Opinionated conventions
  - Specifically uses `bun` environment to improve DX
  - Having specific linting and formating rules using `eslint` 
  - Specifically for `micro frontend` or `multi-app monorepo` applications

Well, I wanted to experiment and make something Nuxt 3 specific. I also wanted to 
see the kind of work involved in creating something of this magnitude. I also wanted 
to create a CLI that i can use on a regular :)

Overall, I wanted to learn and have fun in the process.

This is NOT a component library. It's a collection of re-usable components that  
can copy and paste into your apps.

## What do you mean by micro frontend?

Micro frontend is a frontend that is small and focused on a single use case.

## What about multi-app monorepo?

A multi-app monorepo is a single repository that contains multiple related
applications and shared packages or libraries, enabling easy code sharing,
consistent tooling, and coordinated releases across projects.

## What do you mean by registry and not a component library?

I mean you do not install it as a dependency. It is not available or distributed 
via npm.

Pick the components you need. Copy and paste the code into your project and customize 
to your needs. The code is yours.

Use this as a reference to build your own component libraries.

Visit the FAQ page here to learn more: https://ui.shadcn.com/docs#faq
