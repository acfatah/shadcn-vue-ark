/**
 * Extends the default `@vueuse/core` useFetch implementation.
 *
 * - Adds the base URL loaded from `VITE_API_URL`.
 *
 * Read more:
 * - https://vueuse.org/core/useFetch
 */
import { createFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL
if (!API_URL)
  throw new Error('VITE_API_URL is not defined')

export const useFetch = createFetch({
  baseUrl: API_URL,
  options: {
    onFetchError(ctx) {
      // Optionally log the error or show a notification

      return ctx
    },

    // https://vueuse.org/core/useFetch/#intercepting-a-request
    async beforeFetch({ options }) {
      if (!API_URL)
        throw new Error('VITE_API_URL is not defined')

      options.credentials = 'include'

      options.headers = {
        Accept: 'application/json',
        ...options.headers,
      }

      return { options }
    },

    async afterFetch(ctx) {
      // Optionally unwrap the response data
      // ctx.data = ctx.data?.data

      return ctx
    },
  },
})
