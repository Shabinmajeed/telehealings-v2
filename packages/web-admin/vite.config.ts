import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../shared/src'),
    },
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    allowedHosts: ['implied-listening-sharing-wednesday.trycloudflare.com', 'telehealings-admin.loca.lt', '.loca.lt', '.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:5172',
        changeOrigin: true,
      },
      '/therapist': {
        target: 'http://localhost:5172',
        changeOrigin: true,
      },
      '/guest': {
        target: 'http://localhost:5172',
        changeOrigin: true,
      },
    },
  },
  publicDir: path.resolve(__dirname, '../../shared/assets'),
});
