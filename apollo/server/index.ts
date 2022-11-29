import { defineApolloClient } from '@nuxtjs/apollo'
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

declare module '#app' {
    interface NuxtApp {
        $apollo: {
            defaultClient: ApolloClient<NormalizedCacheObject>
        }
    }
}

export default defineApolloClient({
    httpEndpoint: process.env.NUXT_PUBLIC_API_GRAPHQL_ENDPOINT as string,
    browserHttpEndpoint: '',
    wsEndpoint: process.env.NUXT_PUBLIC_API_GRAPHQL_SUBSCRIPTION_ENDPOINT as string,
    httpLinkOptions: {},
    wsLinkOptions: {},
    websocketsOnly: false,
    connectToDevTools: false,
    defaultOptions: {},
    inMemoryCacheOptions: {},
    tokenName: 'apollo:app.token',
    tokenStorage: 'cookie',
    authHeader: 'Authorization'
})
