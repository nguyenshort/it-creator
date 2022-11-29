import {defineNuxtPlugin} from "#imports"

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

declare module '#app' {
    interface NuxtApp {
        $dayjs: typeof dayjs
    }
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $dayjs: typeof dayjs
    }
}

export default defineNuxtPlugin(() => {

    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)
    dayjs.locale('vi')

    return {
        provide: {
            dayjs
        }
    }
})
