// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  app:{
    head: {
      title: "Steam Authentication — Nuxt 3"
    }
  },
  runtimeConfig: {
    public: {
      "api": process.env.APIKEY,
      "domain": process.env.DOMAIN
    }
  }
})