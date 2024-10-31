
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite';



export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    target: 'esnext', // Ensures Vite outputs the latest ES module syntax
    rollupOptions: {
      input: {
        popup: 'configuration/popup.js',
        options: 'configuration/options.js',
        // content: 'configuration/content.js',
        background: 'configuration/background.js',
        backgroundModal: 'configuration/backgroundModal.js'
      },
      output: {
        entryFileNames: '[name].js', // JS entry files placed at root level
        chunkFileNames: 'scripts/[name].js', // Chunk files placed in scripts/
        assetFileNames: 'assets/[name].[ext]', // Asset files placed in assets/
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
