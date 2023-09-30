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
    "api": process.env.APIKEY,
    "success": "http://localhost:3000/success",
    public: {
      "api": process.env.APIKEY,
      "success": "http://localhost:3000/success"
    }
  }
})