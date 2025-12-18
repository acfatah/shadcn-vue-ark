export type Booleanish = boolean | 'true' | 'false' | 'on' | 'off'

/**
 * Converts a boolean-like value to a strict boolean.
 *
 * See: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/boolean.ts
 *
 * @param value - The value to convert, which may be a boolean or a string representation of a boolean.
 * @returns `true` if the value is the boolean `true` or the strings `'true'`/`'on'`; otherwise `false`.
 */
export function toBooleanValue(value: Booleanish | null | undefined) {
  if (typeof value === 'boolean')
    return value

  if (!value)
    return false

  const normalized = value.toLowerCase()

  return normalized === 'true' || normalized === 'on'
}
