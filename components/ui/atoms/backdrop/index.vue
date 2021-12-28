<template>
  <transition name="a-backdrop-">
    <div v-if="isActive" class="a-backdrop" :class="classes" :style="styles" />
  </transition>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
      milkglass: false,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  computed: {
    classes() {
      return {
        'a-backdrop--milkglass': this.milkglass
      }
    },
    styles() {
      return {
        '--a-backdrop-bg-color': this.backgroundColor
      }
    }
  },
  methods: {
    show() {
      this.isActive = true
    },
    hide() {
      this.isActive = false
    }
  }
}
</script>
<style>
.a-backdrop {
  position: fixed !important;
  z-index: var(--z-backdrop);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--a-backdrop-bg-color);
}

/*
 *  Variants
 */
.a-backdrop--milkglass {
  backdrop-filter: blur(0.25rem);
}

/*
 *  Transitions
 */
.a-backdrop--enter-active,
.a-backdrop--leave-active {
  transition: opacity 0.15s;
}
.a-backdrop--enter,
.fade-leave-to {
  opacity: 0;
}
</style>
