import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import mkcert from "vite-plugin-mkcert";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import compression from "vite-plugin-compression";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert(),
    cssInjectedByJsPlugin(),
    compression({
      algorithm: "brotliCompress", // یا gzip
      ext: ".br", // یا .gz
      threshold: 1024, // فایل‌هایی بزرگتر از 1KB فشرده می‌شن
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@public": path.resolve(__dirname, "public"),
    },
  },
  // server: {
  //   port: 8080,
  //   host: "192.168.20.153",
  // },
});
