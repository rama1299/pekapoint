import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    csrf: {
      checkOrigin: false
    },
    vite: {
      optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
      },
    },
  },
  preprocess: vitePreprocess()
};

export default config;
