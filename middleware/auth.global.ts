import { defineNuxtRouteMiddleware, useAppStore } from '#imports'
import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAppStore()
    if (authStore.auth) {
        if (to.path === '/') {
            navigateTo('/dashboard')
        }
    } else if (to.path !== '/') {
        navigateTo('/')
    }
})
