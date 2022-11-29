import { defineEventHandler, getHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  try {
    const auth = getHeader(event, 'Authorization')
    if (!auth) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized'
        }
      }
    }
    const data = await $fetch(config.public.apiBackend + '/users/me', {
      headers: {
        Authorization: auth
      }
    })
    if (!data) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized'
        }
      }
    }

    return {
      status: 200,
      body: {
        user: data
      }
    }
  } catch (e) {
    return {
      status: 401,
      body: {
        message: 'Unauthorized'
      }
    }
  }
})
