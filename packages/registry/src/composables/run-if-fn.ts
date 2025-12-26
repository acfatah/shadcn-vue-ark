type AnyFunction<Arg = unknown, ReturnValue = unknown> = (...args: Arg[]) => ReturnValue

const isFunction = <T = AnyFunction>(value: unknown): value is T => typeof value === 'function'

/**
 * Source: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/run-if-fn.ts
 */
export function runIfFn<MaybeReturnValue, FunctionArgs>(valueOrFn: MaybeReturnValue | ((...fnArgs: FunctionArgs[]) => MaybeReturnValue), ...args: FunctionArgs[]) {
  return isFunction<AnyFunction<FunctionArgs, MaybeReturnValue>>(valueOrFn)
    ? valueOrFn(...args)
    : (valueOrFn as unknown as MaybeReturnValue)
}
