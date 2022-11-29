import { defineEventHandler, deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
    deleteCookie(event, 'apollo:app.token')
    return {
        status: 200
    }
})
