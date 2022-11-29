import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueCropper', VueCropper)
})
