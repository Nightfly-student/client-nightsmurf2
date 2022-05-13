import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";
import axios from "axios";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  plugins: [
    vue(),
    Pages({
      dirs: [
        { dir: "src/views", baseRoute: "" },
        { dir: "src/views/admin", baseRoute: "admin" },
        { dir: "src/views/user", baseRoute: "user" },
      ],
      extendRoute(route, parent) {
        if (route.path === "/login" || route.path === "/register") {
          return {
            ...route,
            meta: { noRoute: true },
          };
        }
        if (route.path === "/") {
          // Index is unauthenticated.
          return route;
        }
        // Augment the route with meta that indicates that the route requires authentication.
        if (route.path.includes("user")) {
          return {
            ...route,
            meta: { userAuth: true },
          };
        }
        if (route.path.includes("admin")) {
          return {
            ...route,
            meta: { adminAuth: true },
          };
        }
      },
      onRoutesGenerated: async (routes) => {
        generateSitemap({
          routes: [...routes],
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "../server/public",
  },
});
