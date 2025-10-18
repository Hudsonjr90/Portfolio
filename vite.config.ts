import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: "stats.html", open: true }) as any,
  ],
  esbuild: {
    // Target modern browsers to reduce polyfills
    target: 'es2020',
    // Remove console.log in production
    drop: ['console', 'debugger'],
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: ["js-big-decimal"],
    force: true,
    entries: ["src/main.tsx"],
  },
  build: {
    chunkSizeWarningLimit: 2000,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // UI Libraries
          'ui-libs': [
            '@mui/material',
            '@emotion/react', 
            '@emotion/styled',
            'framer-motion',
            'react-bootstrap'
          ],
          
          // Chart libraries (used only in Skills page)
          'chart-libs': [
            'echarts',
            'echarts-for-react',
            'echarts-wordcloud'
          ],
          
          // Icon libraries
          'icon-libs': [
            'react-icons',
            'devicon'
          ],
          
          // Utils and smaller libs
          'utils': [
            'i18next',
            'react-i18next',
            'axios',
            'sweetalert2',
            'file-saver',
            'react-flags-select'
          ],
          
          // Particles (only used in some pages)
          'particles': [
            'react-tsparticles',
            'tsparticles',
            'tsparticles-engine'
          ],
          
          // Specialized components
          'components': [
            'react-vertical-timeline-component',
            'react-paginate',
            'typewriter-effect',
            'atropos',
            'swiper'
          ]
        },
      },
    },
  },
});


