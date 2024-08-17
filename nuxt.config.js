import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: "2024-08-16",

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
  ],

  imports: {
    dirs: [resolve("stores/**")],
  },
})
