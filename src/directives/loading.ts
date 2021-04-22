import type { App, Directive } from 'vue';

const loadingDirective: Directive = {
  mounted(el, binding) {

  },
  updated(el, binding) {

  },
  unmounted(el) {
    
  }
}

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective)
}

export default loadingDirective;
