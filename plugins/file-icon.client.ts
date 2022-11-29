// @ts-ignore
import * as FileIcon from 'file-icons-js'
import 'file-icons-js/css/style.css'
import {defineNuxtPlugin} from "#imports"

interface FileIcon {
    getClass: (filename: string) => string
    getClassWithColor: (filename: string) => string
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $fileIcon: FileIcon
    }
}

declare module '#app' {
    interface NuxtApp {
        $fileIcon: FileIcon
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            fileIcon: FileIcon
        }
    }
})
