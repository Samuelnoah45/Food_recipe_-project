import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import gql from 'vite-plugin-simple-gql';
// import components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    gql(),

  ],
  build: {
    rollupOptions: {
      external: [
        "graphql", // ignore react stuff
        
      ],
    },
  },

})
