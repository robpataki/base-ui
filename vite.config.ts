import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      rollupTypes: true,
      entry: 'src/index.ts',
      outDir: 'dist'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BaseUI',
      formats: ['es', 'cjs'],
      fileName: format => {
        if (format === 'es') {
          return 'index.mjs';
        }
        return 'index.cjs';
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});
