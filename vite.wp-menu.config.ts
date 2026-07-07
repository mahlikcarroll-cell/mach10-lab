import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs/promises";
import path from "node:path";

export default defineConfig({
  base: "./",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  publicDir: false,
  plugins: [
    react(),
    {
      name: "copy-mach10-menu-assets",
      async closeBundle() {
        const outDir = path.resolve(__dirname, "dist/wp-menu");

        await fs.mkdir(path.join(outDir, "images"), { recursive: true });
        await Promise.all([
          fs.copyFile(
            path.resolve(__dirname, "public/blueprint-base.svg"),
            path.join(outDir, "blueprint-base.svg")
          ),
          fs.copyFile(
            path.resolve(__dirname, "public/blueprint-lines.svg"),
            path.join(outDir, "blueprint-lines.svg")
          ),
          fs.copyFile(
            path.resolve(__dirname, "public/images/mach10-icon.svg"),
            path.join(outDir, "images/mach10-icon.svg")
          ),
        ]);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  build: {
    outDir: "dist/wp-menu",
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/mach10-menu-entry.tsx"),
      name: "Mach10Menu",
      formats: ["es"],
      fileName: () => "mach10-menu.js",
      cssFileName: "mach10-menu",
    },
    rollupOptions: {
      output: {
        assetFileNames: "mach10-menu[extname]",
      },
    },
  },
});
