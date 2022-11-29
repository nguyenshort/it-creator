import { defineStore } from '#imports'
import { useNuxtApp } from '#app'
import {GET_ME} from "~/apollo/server/queries/auth.query";
import {GetMe_me} from "~/apollo/server/queries/__generated__/GetMe";

interface AppInstance {
  token?: string
  user?: GetMe_me
}

export const useAppStore = defineStore('app', {
  state: () => ({
    token: '',
    user: undefined
  } as AppInstance),

  getters: {
    auth: (state) => !!state.user,
  },

  actions: {
    async getUser() {
      const { $apollo } = useNuxtApp()
      try {
        const { data } = await $apollo.defaultClient.query({
          query: GET_ME
        })
        if (data.me) {
          this.user = data.me
        }
      } catch (e) {
        console.log('get User', e)
        //
      }
    },

    async logOut() {
      try {
        this.token = ''
        this.user = undefined
        await $fetch('/api/logout', { method: 'POST' })
      } catch (e) {
        //
      }
    }
  }
})
