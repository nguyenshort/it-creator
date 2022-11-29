export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Yuan - A Queer Developer' }
      ],
      script: [
        {
          src: 'https://cdn.tiny.cloud/1/qnkbcmjzf2jgpydlbxq6qpkom6k01agtov5cruqnfyj5qu3k/tinymce/6/tinymce.min.js',
          crossorigin: 'anonymous'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,400i,500,600,700'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Merriweather:700,400,400'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap'
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
    // '@intlify/nuxt3',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore']
      }
    ]
  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },
  imports: {
    autoImport: true,
    imports: [
      { name: 'useAuth', from: '@vueuse/firebase' },
      { name: 'getDatabase', from: 'firebase/database' },
      { name: 'ref', from: 'firebase/database', as: 'dbRef' },
      { name: 'set', from: 'firebase/database', as: 'dbSet' },
      { name: 'onValue', from: 'firebase/database', as: 'dbOnValue' },
      { name: 'useAxios', from: '@vueuse/integrations/useAxios' }
    ]
  },
  apollo: {
    clients: {
      default: './apollo/server/index.ts'
    }
  },
  runtimeConfig: {
    // Private config that is only available on the server
    apiSecret: '123',
    // Config within public will be also exposed to the client
    public: {
      apiBase: '/api',
      apiGraphQL: process.env.NUXT_PUBLIC_API_GRAPHQL_ENDPOINT,
      cdnEndpoint: process.env.NUXT_PUBLIC_API_CDN_ENDPOINT,
      apiBackend: process.env.NUXT_PUBLIC_API_BACKEND_ENDPOINT
    }
  },
  hooks: {
    'pages:extend'(routes) {
      routes.forEach((route) => {
        if (route.path === '/projects') {
          route.path = '/projects/:id'
        }
      })
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#3b66f5',
            'border-radius-base': '6px',
            'input-padding-horizontal': '15px',
            'form-vertical-label-padding': '0 0 4px',
            'text-color': '#4B5563',
            'label-color': '#4B5563',
            'surface-lighter': '#f6f7fc',
            'table-header-bg': '#fff',
            'table-header-color': 'rgba(18,18,23,.6)',
            'table-selected-row-bg': '#fff',
            'font-family':
              'Nunito Sans, SF Pro Text, SF Pro Icons, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif'
          }
        }
      }
    }
  }
})
