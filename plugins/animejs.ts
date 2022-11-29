import {defineNuxtPlugin} from "#imports"
import anime from 'animejs'

export const ANIME_CONSTANT = Symbol.for('animejs')

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            anime
        }
    }
})
