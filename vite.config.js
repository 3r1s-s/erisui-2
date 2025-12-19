import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'eui',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? `erisui.mjs` : `erisui.js`
    },
    rollupOptions: {
      output: {
        assetFileNames: 'erisui.[ext]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false
  }
});
