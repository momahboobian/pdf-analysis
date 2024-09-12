import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pluginTerminal from 'vite-plugin-terminal'

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'info',
  plugins: [
    [react()],
    pluginTerminal({
      console: 'terminal',
      output: ['terminal', 'console'],
    }),
  ],
  server: {
    port: 3030,
  },
  preview: {
    port: 3010,
  },
  base: '/',
})
