export const tailwindViewports = {
  'xs': {
    name: 'mobile',
    styles: {
      // 20rem
      width: '320px',
      height: '568px',
    },
    type: 'mobile',
  },
  'sm': {
    name: 'sm',
    styles: {
      // 40rem
      width: '640px',
      height: '768px',
    },
    type: 'mobile',
  },
  'md': {
    name: 'md',
    styles: {
      // 48rem
      width: '768px',
      height: '768px',
    },
    type: 'tablet',
  },
  'lg': {
    name: 'lg',
    styles: {
      // 64rem, 4:3 aspect ratio
      width: '1024px',
      height: '768px',
    },
    type: 'desktop',
  },
  'xl': {
    name: 'xl',
    styles: {
      // 80rem, 4:3 aspect ratio
      width: '1280px',
      height: '960px',
    },
    type: 'desktop',
  },
  '2xl': {
    name: '2xl',
    styles: {
      // 96rem, 4:3 aspect ratio
      width: '1536px',
      height: '1152px',
    },
    type: 'desktop',
  },

  // Custom viewports from shadcn
  '3xl': {
    name: '3xl',
    styles: {
      // 100rem, 4:3 aspect ratio
      width: '1600px',
      height: '1200px',
    },
    type: 'desktop',
  },
  '4xl': {
    name: '4xl',
    styles: {
      // 125rem, 4:3 aspect ratio
      width: '2000px',
      height: '1500px',
    },
    type: 'desktop',
  },
}
