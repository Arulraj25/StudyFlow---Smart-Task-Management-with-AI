// vite.config.js - Vite build/dev server configuration
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // default Vite dev server port
  },
});
