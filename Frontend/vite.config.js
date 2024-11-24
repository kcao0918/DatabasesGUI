import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite config with alias
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias '@' to 'src'
    },
  },
});
