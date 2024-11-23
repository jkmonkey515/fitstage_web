import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Replace with your backend server URL
        changeOrigin: true,
        secure: false, // Use only if your backend is HTTPS and you don't have a valid certificate
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional, adjust API path
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
