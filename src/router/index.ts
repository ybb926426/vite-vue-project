// import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    }
  ] as Array<RouteRecordRaw>,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
