import type { App } from 'vue';

import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

import './antd-variables.less';

export function setupAntd(app: App<Element>) {
  // app.component(Button.Group.name, Button.Group);
  app.use(Antd);
}
