const development = process.env.NODE_ENV !== 'production'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EMOODJI',
    htmlAttrs: {
      lang: 'de'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4000',
    backendUrl: process.env.BACKEND_URL || 'http://localhost:4000'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/helpers.js', '~/plugins/components.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components/ui/electrons',
      prefix: 'e-'
    },
    {
      path: '~/components/ui/atoms',
      prefix: 'a-'
    },
    {
      path: '~/components/ui/molecules',
      prefix: 'm-'
    },
    {
      path: '~/components/ui/organisms',
      prefix: 'o-'
    },
    {
      path: '~/components/icons',
      prefix: 'i-'
    },
    {
      path: '~/components/views',
      prefix: 'v-'
    },
    {
      path: '~/components/layouts',
      prefix: 'l-'
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@aceforth/nuxt-optimized-images'
  ],
  googleFonts: {
    families: {
      Nunito: {
        wght: [700]
      },
      'Open+Sans': {
        wght: [400, 700]
      }
    }
  },
  optimizedImages: {
    optimizeImages: true
  },
  axios: {
    baseURL: development ? 'http://localhost:4000' : 'http://localhost:4000'
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 60 * 15,
          global: true
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/signin'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
