import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import istanbul from 'vite-plugin-istanbul'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'development' ? '/' : '/dayco/'
  return {
    base,
    resolve: {
      alias: {
        // From https://github.com/vitejs/vite/discussions/6282
        Buffer: 'buffer',
        // From https://gist.github.com/ef4/d2cf5672a93cf241fd47c020b9b3066a (polyfills webpack)
        crypto: 'crypto-browserify',
        querystring: 'querystring-es3',
        stream: 'stream-browserify',
        _stream_readable: 'readable-stream/readable',
      },
    },
    plugins: [
      react(),
      istanbul({
        cypress: true,
        requireEnv: false,
      }),
      VitePWA({
        base,
        injectRegister: 'auto',
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        includeAssets: ['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Dayco',
          short_name: 'Dayco',
          description: 'Dayco',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: `${base}android-chrome-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `${base}android-chrome-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          // Node.js global to browser globalThis
          global: 'globalThis',
        },
      },
    },
  }
})
