import { useAppStore, useEventBus, useNuxtApp } from '#imports'

export const $authFunc = (callback: Function) => {
  const appStore = useAppStore()
  const { $modal } = useNuxtApp()

  if (appStore.auth) {
    callback()
  } else {
    $modal().open('auth')
  }
}
