import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/style.css"],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["postings-identify-thompson-cookie.trycloudflare.com"],
    },
  },

  routeRules: {
    "/": { redirect: "/cap" },
  },

  modules: ["shadcn-nuxt"],
  shadcn: {
    prefix: "",
  },
});
