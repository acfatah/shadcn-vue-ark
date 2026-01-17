<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class', 'inline')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const inline = computed(() => props.inline || undefined)
</script>

<template>
  <ark.div
    v-bind="forwardedProps"
    data-scope="input-group"
    :data-inline="inline"
    :class="cn(
      'flex max-w-md flex-col gap-2',
      `md:data-[inline=true]:grid md:data-[inline=true]:grid-cols-3`,
      `md:data-[inline=true]:[&_[data-scope=input][data-part=label]]:col-span-1`,
      `md:data-[inline=true]:**:data-[scope$='-input']:col-span-2`,
      `
        md:data-[inline=true]:[&_[data-scope=input][data-part=description]]:col-span-2
        md:data-[inline=true]:[&_[data-scope=input][data-part=description]]:col-start-2
      `,
      `
        md:data-[inline=true]:[&_[data-scope=input][data-part=error]]:col-span-2
        md:data-[inline=true]:[&_[data-scope=input][data-part=error]]:col-start-2
      `,
      // Handle flex direction for checkbox inputs
      `
        has-data-[scope=checkbox-input]:flex-row has-data-[scope=checkbox-input]:flex-wrap
        data-[inline=true]:has-data-[scope=checkbox-input]:inline-flex
        data-[inline=true]:has-data-[scope=checkbox-input]:not-last:[&>*+*]:mr-4
      `,
      `
        has-data-[scope=checkbox-input]:**:data-[part=description]:flex-inline
        has-data-[scope=checkbox-input]:**:data-[part=description]:w-full
      `,
      `
        md:data-[inline=true]:has-data-[scope=checkbox-input]:grid
        md:data-[inline=true]:has-data-[scope=checkbox-input]:grid-cols-3
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=checkbox-input]:col-start-2
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=checkbox-input]:inline-flex
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:col-span-2
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:col-start-2
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:row-start-1
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:inline-flex
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:items-center
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:self-center
        md:data-[inline=true]:has-data-[scope=checkbox-input]:**:data-[scope=label]:pl-6
        md:data-[inline=true]:has-data-[scope=checkbox-input]:[&_[data-scope=checkbox-input][data-part=root]]:row-start-1
        md:data-[inline=true]:has-data-[scope=checkbox-input]:[&_[data-scope=checkbox-input][data-part=root]]:justify-self-start
      `,

      // Handle flex direction for radio inputs
      `
        has-data-[scope=radio-input]:flex-row has-data-[scope=radio-input]:flex-wrap
        data-[inline=true]:has-data-[scope=radio-input]:inline-flex
        data-[inline=true]:has-data-[scope=radio-input]:not-last:[&>*+*]:mr-4
      `,
      `
        has-data-[scope=radio-input]:**:data-[part=description]:flex-inline
        has-data-[scope=radio-input]:**:data-[part=description]:w-full
      `,
      `
        md:data-[inline=true]:has-data-[scope=radio-input]:grid
        md:data-[inline=true]:has-data-[scope=radio-input]:grid-cols-3
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:col-span-2
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:col-start-2
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:inline-flex
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:items-center
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:self-center
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:pl-6
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=radio-input]:col-start-2
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=radio-input]:inline-flex
        md:data-[inline=true]:has-data-[scope=radio-input]:[&_[data-scope=radio-input][data-part=root]]:justify-self-start
      `,
      `
        md:data-[inline=true]:has-data-[scope=radio-input]:**:data-[scope=label]:row-start-1
        md:data-[inline=true]:has-data-[scope=radio-input]:[&_[data-scope=radio-input][data-part=root]]:row-start-1
      `,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
