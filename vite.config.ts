import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The interface (renderer process). Relative base: it is loaded from a file, not from a server.
export default defineConfig({
  root: 'src/renderer',
  base: './',
  plugins: [react()],
  // three.js makes the bundle large; it is read from disk, so the size warning does not apply.
  build: { outDir: '../../dist/renderer', emptyOutDir: true, target: 'chrome120', chunkSizeWarningLimit: 1200 },
});
