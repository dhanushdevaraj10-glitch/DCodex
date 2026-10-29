import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        material: resolve(import.meta.dirname, 'material.html'),
        runcode: resolve(import.meta.dirname, 'runcode.html'),
        contact: resolve(import.meta.dirname, 'contact.html')
      }
    }
  }
})
