import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-hover-card', '@radix-ui/react-icons', 
                        '@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-slot', 
                        '@radix-ui/react-switch'],
          'framer': ['framer-motion'],
          'icons': ['@iconify/react']
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})
