<template>
  <div class="c-backdrop" :class="{ 'c-backdrop--show': isOpen }" />
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
  transition: all 0.4s;
}
.c-backdrop--show {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: hsla(0, 0%, 100%, 0.95);
  backdrop-filter: blur(0.2rem);
  -webkit-backdrop-filter: blur(0.2rem);
}
</style>
