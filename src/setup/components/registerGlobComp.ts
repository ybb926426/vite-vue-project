// 注册全局组件
import type { App } from 'vue';

import HelloWorld from '@/components/HelloWorld.vue';

const compList:[any] = [HelloWorld];

export function registerGlobComp(app: App<Element>) {
  compList.forEach((comp: any) => {
    app.component(comp.name, comp);
  })
}
