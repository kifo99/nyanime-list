import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  server: {
    host: "localhost",
    port: 3000,
    fs: {
      strict: true,
      deny: [
        "..",
        "/etc/",
        "/usr/",
        path.resolve(__dirname, "node_modules"),
        path.resolve(__dirname, ".env"),
      ],
    },
  },
});
