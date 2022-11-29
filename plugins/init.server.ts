import {defineNuxtPlugin, useAppStore, useRequestEvent} from '#imports'
import { getCookie } from 'h3'

export default defineNuxtPlugin(async (nuxtApp) => {
  const appStore = useAppStore()

  const token = getCookie(useRequestEvent(), 'apollo:app.token')

  try {
    const data = await $fetch('/api/me', {
      headers: {
          Authorization: 'Bearer ' + token
      }
    })
    if(data && data.status === 200) {
      appStore.user = data.body.user as any
      appStore.token = token
    }
  } catch (e) {
      console.log(e)
    //
  }

  nuxtApp.hooks.hook('app:created', async () => {
    //
  })
})
