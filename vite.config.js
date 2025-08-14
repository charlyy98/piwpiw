import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      // Ensure all routes fall back to index.html for SPA routing
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  }
})


