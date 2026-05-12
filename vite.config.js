import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({

  base: './',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pagina_aluno: resolve(__dirname, './pages/pagina_aluno'),
        orientador: resolve(__dirname, './pages/orientador'),
        coordenador: resolve(__dirname, './pages/coordenador')
      },
    },
  },
})