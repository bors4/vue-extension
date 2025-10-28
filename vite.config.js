/* eslint-disable no-undef */
// vite.config.js
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension, {readJsonFile} from 'vite-plugin-web-extension';

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json');
  const pkg = readJsonFile('package.json');

  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  //   // В некоторых случаях, особенно при проблемах с ts-node,
  //   // вам может понадобиться это, но обычно это не требуется.
  //   extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  // },
  base: '',
  plugins: [
    vue(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ['package.json', 'manifest.json'],
      browser: process.env.TARGET || 'chrome',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
