<template>
  <li ref="item">
    <div
      :key="day"
      ref="item"
      class="c-poster__item"
      :class="{ 'c-poster__item--open': isOpen }"
      :style="{ '--open-x': itemOpenOffsetXInPx, '--open-y': itemOpenOffsetYInPx }"
      @click="open()"
      @keypress.up="closeByKey()"
    >
      <c-canvas :day="day" :active="isOpen" />
    </div>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    day: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      item: {
        open: {
          offsetX: 0,
          offsetY: 0
        }
      }
    }
  },
  computed: {
    itemOpenOffsetXInPx() {
      return `${this.item.open.offsetX}px`
    },
    itemOpenOffsetYInPx() {
      return `${this.item.open.offsetY}px`
    }
  },
  methods: {
    ...mapMutations({
      setBackdropOpen: 'global/SET_BACKDROP_OPEN'
    }),
    open() {
      if (this.isOpen) {
        return
      }
      this.isOpen = true
      this.setBackdropOpen(true)
      this.setDimensions()
      document.addEventListener('keyup', this.close)
    },
    close() {
      this.isOpen = false
      this.setBackdropOpen(false)
      document.removeEventListener('keyup', this.close)
    },
    setDimensions() {
      const defaultOffset = this.$refs.item.getBoundingClientRect()
      this.item.open.offsetX = window.innerWidth / 2 - defaultOffset.left
      this.item.open.offsetY = window.innerHeight / 2 - defaultOffset.top
    },
    closeByKey(event) {
      if (event.keyCode === 27) {
        this.close()
      }
    }
  }
}
</script>
<style>
.c-poster__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border-radius: 100%;
  transition: all .3s ease-out, transform .2s ease-out .3s;
}
.c-poster__item--open {
  z-index: 2;
  transform: translate3d(calc(var(--open-x, 0%) - 50%), calc(var(--open-y, 0%) - 50%), 0);
  height: min(80vw, 80vh);
  width: min(80vw, 80vh);
  transition: all .3s ease-in .2s, transform .2s ease-in;
}
</style>
