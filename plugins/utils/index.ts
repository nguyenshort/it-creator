import { defineNuxtPlugin } from '#imports'
import { $cdn } from './cdn'
import { $modal } from './modal'
import { $moneyFormat } from './money'
import { $link } from './link'
import { $authFunc } from '~/plugins/utils/auth'

// Cutsom type
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cdn: typeof $cdn
    $moneyFormat: typeof $moneyFormat
    $modal: typeof $modal
    $link: typeof $link
    $authFunc: typeof $authFunc
  }
}

declare module '#app' {
  interface NuxtApp {
    $cdn: typeof $cdn
    $moneyFormat: typeof $moneyFormat
    $modal: typeof $modal
    $link: typeof $link
    $authFunc: typeof $authFunc
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      cdn: $cdn,
      moneyFormat: $moneyFormat,
      modal: $modal,
      link: $link,
      authFunc: $authFunc
    }
  }
})
