import Toast from '~/components/ui/molecules/toast/index.vue'

export default {
  install(Vue) {
    const CONSTRUCTOR = Vue.extend(Toast)
    let CACHE = null
    function toast(options = {}) {
      const toast = CACHE || (CACHE = new CONSTRUCTOR())
      if (!toast.$el) {
        Object.assign(toast.$data, options)
        const vm = toast.$mount()
        document.querySelector('body').appendChild(vm.$el)
      }
      return toast
    }
    Vue.prototype.$toast = toast
  }
}
