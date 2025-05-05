import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  server: {

    host: '72.167.224.54',     
    // host: '10.0.70.92',     
    port: 8080,      
  },
})
