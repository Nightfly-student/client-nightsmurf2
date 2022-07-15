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
        { dir: "src/views/affiliate", baseRoute: "affiliate" },
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
        if (route.path.includes("affiliate/dashboard")) {
          return {
            ...route,
            meta: { affiliateAuth: true },
          };
        }
      },
      onRoutesGenerated: async (routes) => {
        const products = await axios.get("http://localhost:8080/api/products/");
        const dynamicRoutes = products.data.map(
          (product) => `/product/${product.slug}`
        );
        const blogs = await axios.get("http://localhost:8080/api/blogs/");
        const dynamicBlogs = blogs.data.map((blog) => `/blog/${blog.slug}`);
        generateSitemap({
          routes: [...routes, ...dynamicRoutes, ...dynamicBlogs],
          hostname: "https://nightsmurf.com/",
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
