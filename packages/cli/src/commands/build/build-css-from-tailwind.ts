import type {
  RegistryItem,
  registryItemCssSchema,
  registryItemCssVarsSchema,
} from 'shadcn/schema'
import type { z } from 'zod'

export type RegistryItemCss = z.infer<typeof registryItemCssSchema>
export type RegistryItemCssVars = z.infer<typeof registryItemCssVarsSchema>

export function mergeCss(
  base: RegistryItemCss | undefined,
  next: RegistryItemCss | undefined,
) {
  if (!base)
    return next

  if (!next)
    return base

  const merged: Record<string, unknown> = {
    ...(base as Record<string, unknown>),
  }

  for (const [selector, properties] of Object.entries(next)) {
    const existing = merged[selector]

    if (!existing || typeof existing !== 'object' || Array.isArray(existing)) {
      merged[selector] = properties
      continue
    }

    if (typeof properties !== 'object' || Array.isArray(properties)) {
      merged[selector] = properties
      continue
    }

    merged[selector] = {
      ...(existing as Record<string, unknown>),
      ...(properties as Record<string, unknown>),
    }
  }

  return merged as RegistryItemCss
}

export function buildCssFromTailwind(tailwind: RegistryItem['tailwind']) {
  const theme = tailwind?.config?.theme?.extend
  const animations = theme?.animation
  const keyframes = theme?.keyframes

  if (!animations && !keyframes)
    return undefined

  const themeRules: Record<string, unknown> = {}

  if (animations) {
    for (const [key, value] of Object.entries(animations))
      themeRules[key] = value
  }

  if (keyframes) {
    for (const [key, value] of Object.entries(keyframes))
      themeRules[`@keyframes ${key}`] = value
  }

  if (Object.keys(themeRules).length === 0)
    return undefined

  return {
    '@theme inline': themeRules,
  } satisfies RegistryItemCss
}
