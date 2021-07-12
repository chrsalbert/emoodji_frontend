<template>
  <div
    class="c-backdrop"
    :class="{ 'c-backdrop--show': isOpen }"
  />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isOpen: 'global/backdropOpen'
    })
  }
}
</script>
<style>
.c-backdrop {
  z-index: 1;
  position: fixed;
  transition: all 0.2s;
  pointer-events: none;
}
.c-backdrop--show {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: hsla(0, 0%, 100%, 0.8);
  box-shadow: 20px 20px 40px -6px rgb(0 0 0 / 20%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
