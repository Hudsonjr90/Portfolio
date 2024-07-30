import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'stats.html', open: true }) as any // Cast to any to bypass type checking
  ],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lodash'],
    exclude: ['js-big-decimal'],
    force: true,
    entries: ['src/main.tsx']
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
