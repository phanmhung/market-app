import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Rename the output folder from "dist" to "build"
    assetsDir: 'static', // Rename the assets folder from "assets" to "static"
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name].[hash][extname]', // Output assets with subfolders based on file extension
      },
    },
  },
})