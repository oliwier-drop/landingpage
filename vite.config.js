import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: '.',
    publicDir: false, // Wyłącz domyślne kopiowanie folderu public
    build: {
      outDir: 'public/build',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          app: resolve(__dirname, 'resources/js/app.js')
        },
        output: {
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name].css'
            }
            return 'assets/[name].[ext]'
          }
        }
      },
      manifest: true,
      sourcemap: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'resources'),
        '~': resolve(__dirname, 'resources')
      }
    },
    server: {
      hmr: true,
      watch: {
        usePolling: true
      }
    }
  })