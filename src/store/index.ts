import type { App } from 'vue';
import { createStore, createLogger } from 'vuex';

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()]:[]
})

export function setupStore(app: App<Element>) {
  app.use(store);
}
