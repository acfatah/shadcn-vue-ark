import type { ComputedRef } from 'vue'
import { createContext } from './create-context'

export interface RenderStrategyProps {
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

/**
 * Source: https://github.com/chakra-ui/ark/blob/main/packages/vue/src/utils/use-render-strategy.ts
 */
export const [RenderStrategyPropsProvider, useRenderStrategyProps]
  = createContext<ComputedRef<RenderStrategyProps>>('RenderStrategyProps')
