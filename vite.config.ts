import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  resolve: {
    alias: {
      '@fullcalendar/resource': '@fullcalendar/resource-timegrid', // force it to resolve correctly
    },
  },
  server: {

    host: '10.0.70.92',     
    port: 8080,      
  },
})
