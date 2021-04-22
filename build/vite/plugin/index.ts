import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { ViteEnv } from '../../utils';

import { configCompressPlugin } from './compress';
import { configMockPlugin } from './mock';
import { configImageminPlugin } from './imagemin';
import { configHtmlPlugin } from './html';
import { configStyleImportPlugin } from './styleImport';


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS } = viteEnv;
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
  ];
  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  // vite-plugin-style-import
  // vitePlugins.push(configStyleImportPlugin());
  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS));
  }

  return vitePlugins;
}
