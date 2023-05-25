import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
import Vue from '@vitejs/plugin-vue'
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      Vue(),
    ],
  
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*','**/*.gql'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    }

  })
)
