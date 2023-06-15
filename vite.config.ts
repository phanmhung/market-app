import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Your App Name',
        short_name: 'App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
      },
    }),
  ],
  build: {
    outDir: 'build', // Rename the output folder from "dist" to "build"
    assetsDir: 'static', // Rename the assets folder from "assets" to "static"
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
          return `static/[ext]/[name].[hash][extname]`;
          }
          // end with .svg, .png, .jpg, .jpeg, .gif, .webp
          else if (/\.(svg|png|jpe?g|gif|webp)$/i.test(assetInfo.name)) {
            return `static/img/[name].[hash][extname]`;
          }
          else{
            console.log(assetInfo);
            return `static/js/[name].[hash][extname]`;
          }
        },
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
