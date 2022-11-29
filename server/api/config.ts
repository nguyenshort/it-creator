import {useRuntimeConfig} from "#imports";
import {defineEventHandler} from "h3";

const config = useRuntimeConfig()

export default defineEventHandler((event) => {
    return {
        api: '1234'
    }
})
