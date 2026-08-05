import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    // Source maps are omitted from production to keep the deployed bundle
    // small; run `npm run build -- --sourcemap` when you need to debug a
    // production issue.
    sourcemap: false,
    rollupOptions: {
      output: {
        /**
         * Split long-lived vendor code away from application code so a copy
         * tweak doesn't invalidate the React runtime in every visitor's cache.
         * Route chunks are created automatically by the React.lazy calls in
         * App.tsx and are intentionally not listed here.
         */
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          "ui-vendor": ["@radix-ui/react-accordion", "@radix-ui/react-toast", "lucide-react"],
        },
      },
    },
    // The default 500kB warning fires on the React vendor chunk, which is
    // expected and already split as far as it usefully can be.
    chunkSizeWarningLimit: 700,
  },
});
