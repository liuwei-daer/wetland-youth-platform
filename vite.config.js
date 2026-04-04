import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 57070,
  },
  build: {
    outDir: 'wetland-dist',
    emptyOutDir: true,
  },
})
