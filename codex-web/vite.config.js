import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        runcode: resolve(__dirname, 'runcode.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
})
