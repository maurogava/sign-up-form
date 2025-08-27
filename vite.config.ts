import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Enable CSS modules for files ending with .module.css, .module.scss, etc.
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // @ts-expect-error - Vite types not updated for modern-compiler API
        api: 'modern-compiler',
      },
    },
  },
})
