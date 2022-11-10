/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// import SvgB from '~/assets/bbburst.svg?component'
// https://www.npmjs.com/package/vite-svg-loader
declare module '*.svg?component' 