import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const REPO_PATH = '/Talent-Spotting-Dashboard'

// https://vite.dev/config/
export default defineConfig({
  base: REPO_PATH + '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env.BASENAME': JSON.stringify(REPO_PATH)
  }
})