import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    port: parseInt(process.env.VITE_PORT) || 4500, // Fallback to 3000 if VITE_PORT is not set
  },
})
