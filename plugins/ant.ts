import {defineNuxtPlugin} from "#imports"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Antd)
})
