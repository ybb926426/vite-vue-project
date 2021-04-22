// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import { resolve } from 'path';

import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';
import { generateModifyVars } from './build/config/modifyVars';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;
  const isBuild = command === 'build';
  console.log(viteEnv);
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^@\//,
          replacement: pathResolve('src') + '/',
        },
        // '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      ]
    },
    server: {
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
    build: {
      outDir: OUTPUT_DIR,
      polyfillDynamicImport: VITE_LEGACY,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#00aae7',
            'success-color': '#67c23a', //  Success color
            'error-color': '#f5222d', //  False color
            'warning-color': '#EFBD47',
            'link-color': '#00aae7',
            'text-color': '#515151',
            'label-color': '#515151',
            'font-size-base': '13px',
            'outline-width': '0px',
            'table-padding-horizontal': '12px',
            'table-padding-vertical': '12px',
            'collapse-header-bg': '#fff',
          },
          // lessOptions: {
          //   'primary-color': '#1890ff',
          //   'success-color': '#67c23a', //  Success color
          //   'error-color': '#f5222d',
          // },
          javascriptEnabled: true
          // modifyVars: {
          //   // hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
          //   // ...generateModifyVars(),
          // },
          // javascriptEnabled: true
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [],
      exclude: []
    }
  }
}