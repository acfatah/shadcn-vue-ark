import { createToaster } from '@ark-ui/vue/toast'

export { default as Toaster } from './Sonner.vue'

export const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
})

type ToastCreateOptions = Parameters<typeof toaster.create>[0]
type ToastOptions = Omit<ToastCreateOptions, 'title'>

type ToastFn = (title: string, options?: ToastOptions) => string

const baseToast: ToastFn = (title, options = {}) => {
  return toaster.create({
    title,
    ...options,
  })
}

export const toast = Object.assign(baseToast, {
  success: (title: string, options: ToastOptions = {}) =>
    toaster.create({
      title,
      type: 'success',
      ...options,
    }),

  info: (title: string, options: ToastOptions = {}) =>
    toaster.create({
      title,
      type: 'info',
      ...options,
    }),

  warning: (title: string, options: ToastOptions = {}) =>
    toaster.create({
      title,
      type: 'warning',
      ...options,
    }),

  error: (title: string, options: ToastOptions = {}) =>
    toaster.create({
      title,
      type: 'error',
      ...options,
    }),

  loading: (title: string, options: ToastOptions = {}) =>
    toaster.create({
      title,
      type: 'loading',
      ...options,
    }),

  promise: toaster.promise,
  update: toaster.update,
  dismiss: toaster.dismiss,
})
