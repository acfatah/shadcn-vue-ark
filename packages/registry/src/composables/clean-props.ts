/**
 * Remove properties with `undefined` values from an object, returning a new shallow-copied object.
 *
 * Notes:
 * - Only properties with the value `undefined` are omitted. Other falsy values such as `null`, `false`, `0`,
 *   and `""` are preserved.
 * - Symbol-keyed properties and non-enumerable properties are ignored.
 * - The operation is shallow: nested objects or arrays are copied by reference.
 * - The implementation builds a `Partial<T>` and then narrows/casts the result to `{ [K in keyof T]: T[K] }`.
 *
 * Source: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/clean-props.ts
 */
export function cleanProps<T extends object>(obj: T): { [K in keyof T]: T[K] } {
  const result: Partial<T> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key as keyof T] = value
    }
  }

  return result as { [K in keyof T]: T[K] }
}
