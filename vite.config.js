import { defineConfig } from 'vite';
import { globSync } from 'glob';
import sass from 'sass';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: 'src',

    publicDir: '../public',

    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },

    build: {
      outDir: '../dist',
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        input: globSync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'js/commonHelpers.js';
            }
            return 'js/[name].[hash].js';
          },
          chunkFileNames: chunkInfo => {
            if (chunkInfo.name === 'vendor') {
              return 'js/vendor.js';
            }
            return 'js/[name].[hash].js';
          },
          assetFileNames: assetInfo => {
            const name = assetInfo.names ? assetInfo.names[0] : '';
            const ext = name.split('.').pop();

            if (/\.(png|jpe?g|gif|webp|bmp|tiff)$/.test(name)) {
              return 'assets/images/content/[name].[hash].[ext]';
            }
            if (/\.svg$/.test(name)) {
              return 'assets/images/icons/[name].[hash].[ext]';
            }
            if (/\.(woff2?|ttf|otf|eot)$/.test(name)) {
              return 'assets/fonts/[name].[hash].[ext]';
            }
            if (/\.(mp4|webm|ogg|mov|avi|mkv)$/.test(name)) {
              return 'assets/videos/[name].[hash].[ext]';
            }
            if (ext === 'css') {
              return 'css/[name].[hash].[ext]';
            }
            return 'assets/other/[name].[hash].[ext]';
          },
        },
      },
    },

    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],

    css: {
      preprocessorOptions: {
        sass: {
          implementation: sass,
          additionalData: ` $class: &; `,
        },
      },
    },
  };
});
