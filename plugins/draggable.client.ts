import draggable from 'vuedraggable'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('Draggable', draggable)
})
