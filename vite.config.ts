// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const moduleName = id.split('/')[2];
            if (['react', 'react-dom', 'react-router-dom'].includes(moduleName)) {
              return 'vendor';
            }
            if (moduleName.startsWith('@')) {
              return moduleName.split('/')[0];
            }
            return 'libs';
          }
        }
      }
    }
  }
})
