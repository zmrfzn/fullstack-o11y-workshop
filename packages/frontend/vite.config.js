import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Codespaces forwards 3000 by default
    host: '0.0.0.0', // Listen on all interfaces for Codespaces
    proxy: {
      '/api': 'http://localhost:8080' // dev proxy so VITE_APP_API_URL=/api works in Codespaces
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '.instruqt.io',
      '.app.github.dev',
      '.githubpreview.dev' // Codespaces preview URLs
    ]
  }
})
