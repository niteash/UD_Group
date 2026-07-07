import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    // Minification disabled temporarily (can enable after installing esbuild)
    minify: false,
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('gsap') || id.includes('motion') || id.includes('lenis')) {
              return 'animation-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    
    // Increase chunk size warning limit (these are valid for 3D sites)
    chunkSizeWarningLimit: 1000,
    
    // Disable source maps in production
    sourcemap: false,
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'three'],
  },
  
  // Server configuration for development
  server: {
    hmr: {
      overlay: false,
    },
  },
})
