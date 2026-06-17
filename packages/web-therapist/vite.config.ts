import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: '0.0.0.0' },
  publicDir: path.resolve(__dirname, '../../shared/assets'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
