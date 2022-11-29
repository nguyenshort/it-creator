import { defineNuxtPlugin, useAppStore, useRuntimeConfig } from '#imports'
import axios, { AxiosInstance } from 'axios'

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosInstance
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const http = axios.create({
    timeout: 10000,
    baseURL: config.public.apiBackend
  })
  http.interceptors.request.use(
    (config) => {
      const useUser = useAppStore()
      console.log('🔥 Request to:', config.url)
      config.headers!['Authorization'] = 'Bearer ' + useUser.token
      return config
    },
    (error) => {
      console.log(error) // for debug
      Promise.reject(error)
    }
  )
  // service.interceptors.http
  http.interceptors.response.use(
    (response) => {
      // if (response.headers.authorization) {
      //   setToken(response.headers.authorization)
      //   response.data.token = response.headers.authorization
      // }
      console.log('🌈 Response from:', response.config.url)
      return response.data
    },
    (error) => {
      const message = error.response.data.message || error.message
      console.log(message)
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: http
    }
  }
})
