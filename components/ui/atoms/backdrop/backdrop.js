import Backdrop from '~/components/ui/atoms/backdrop/index.vue'

export default {
  install(Vue) {
    const CONSTRUCTOR = Vue.extend(Backdrop)
    let CACHE = null
    function backdrop(options = {}) {
      const backdrop = CACHE || (CACHE = new CONSTRUCTOR())
      if (!backdrop.$el) {
        Object.assign(backdrop.$data, options)
        const vm = backdrop.$mount()
        document.querySelector('body').appendChild(vm.$el)
      }
      return backdrop
    }
    Vue.prototype.$backdrop = backdrop
  }
}
