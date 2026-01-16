import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'form-vendor': ['react-hook-form'],

          // Feature chunks - separate by functionality
          'home-pages': [
            './src/pages/HomeTemplate/Auth_Page/index.tsx',
            './src/pages/HomeTemplate/Listing_Page/index.tsx',
            './src/pages/HomeTemplate/My_Bookings/index.tsx',
            './src/pages/HomeTemplate/Room_Detail_Page/index.tsx',
            './src/pages/HomeTemplate/User_Profile/index.tsx',
          ],
          'admin-pages': [
            './src/pages/AdminTemplate/Admin_Dashboard/index.tsx',
            './src/pages/AdminTemplate/Auth/index.tsx',
            './src/pages/AdminTemplate/Booking_Management/index.tsx',
            './src/pages/AdminTemplate/Location_Management/index.tsx',
            './src/pages/AdminTemplate/Room_Management/index.tsx',
            './src/pages/AdminTemplate/User_Management/index.tsx',
          ],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
  },
})
