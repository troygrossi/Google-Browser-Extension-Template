import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'configuration/content.js', // Only content script as entry point
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'content.js'
      }
    },
    outDir: 'dist',
    emptyOutDir: false // Prevents deleting other files from main build
  }
});