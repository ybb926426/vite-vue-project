import { createApp } from 'vue';
import App from './App.vue';

import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { registerGlobComp } from '@/setup/components/registerGlobComp';
import { setupAntd } from '@/setup/ant-design-vue/index';
import { setupI18n } from '@/locales/setupI18n';
import { setupGlobDirectives } from '@/directives';

const app = createApp(App);
// Register global components
registerGlobComp(app);
// i18n Multilingual configuration
setupI18n(app);
// Configure routing
setupRouter(app);
// Configure vuex store
setupStore(app);
// Register global directive
setupGlobDirectives(app);
// ant-design-vue
setupAntd(app);

router.isReady().then(() => {
  app.mount('#app', true);
});
