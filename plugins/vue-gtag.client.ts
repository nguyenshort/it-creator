import VueGtag from 'vue-gtag-next'
import {defineNuxtPlugin} from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: 'GA_MEASUREMENT_ID'
        }
    })
})
