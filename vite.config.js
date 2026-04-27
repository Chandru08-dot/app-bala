import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/', // ✨ Optimized for Vercel root deployment
    plugins: [react()]
});
