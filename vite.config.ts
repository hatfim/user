import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
  resolve: {
    alias: {
      '@application': '/src/application',
      '@services': '/src/services',
      '@domains': '/src/domains',
      '@lib': '/src/lib',
      '@ui': '/src/ui',

      // Domain
      '@user': '/src/domains/User'
    },
  },
	server: {
		host: true,
		strictPort: true,
	},
});
