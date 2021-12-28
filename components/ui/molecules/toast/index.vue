<template>
  <div class="m-toast">
    <transition-group name="m-toast" tag="div">
      <div
        v-for="slice in slices"
        :key="slice.id"
        class="m-toast__slice"
        :class="getVariantClass(slice.variant)"
      >
        {{ slice.text }}
        <div class="m-toast__close">
          <a-button
            icon-name="close"
            chameleon
            size="xs"
            @click.native="hide(slice.id)"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slices: []
    }
  },
  methods: {
    show(options) {
      const sliceId = this.$nuxt.$getRandomId()
      this.slices.unshift({
        id: sliceId,
        text: options.text,
        variant: options.variant,
        remove: false,
        timeout: this.setTimeout(sliceId, options.timeout || 5000)
      })
    },
    hideAll() {
      this.slices.forEach(slice => {
        clearTimeout(slice.timeout)
      })
      this.slices = []
    },
    hideOne(sliceId) {
      clearTimeout(this.getSliceById(sliceId).timeout)
      this.slices = this.slices.filter(slice => slice.id !== sliceId)
    },
    getSliceById(id) {
      return this.slices.find(slice => slice.id === id)
    },
    getVariantClass(variant) {
      return variant ? `m-toast__slice--${variant}` : null
    },
    setTimeout(sliceId, timeout) {
      if (!timeout) {
        return
      }
      return window.setTimeout(() => {
        this.hideOne(sliceId)
      }, timeout)
    }
  }
}
</script>
<style>
.m-toast {
  position: fixed;
  z-index: var(--z-toast);
  top: var(--space-4);
  left: 50%;
  transform: translateX(-50%);
}
.m-toast > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  transition: all 0.2s;
}
.m-toast__slice {
  z-index: 1;
  position: relative;
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 14rem;
  padding: var(--space-1) var(--space-2) var(--space-1) var(--space-4);
  border-radius: var(--border-radius-1);
  background: var(--m-toast-bg-color, var(--color-gray-800));
  color: var(--m-toast-text-color, var(--color-white));
  text-align: center;
  box-shadow: var(--shadow-5);
}
.m-toast__close {
  color: #fff;
}
.m-toast__close {
  justify-self: end;
}

/*
 *  Variants
 */
.m-toast__slice {
  --m-toast-text-color: var(--color-white);
  --m-toast-bg-color: var(--color-gray-800);
}

.m-toast__slice--positive {
  --m-toast-text-color: var(--color-white);
  --m-toast-bg-color: var(--color-positive-600);
}

.m-toast__slice--negative {
  --m-toast-text-color: var(--color-white);
  --m-toast-bg-color: var(--color-negative-600);
}

/*
 *  Transitions
 */
.m-toast-enter-active,
.m-toast-leave-active {
  transition: all 0.15s ease-out;
  max-height: calc(calc(var(--space-1) * 2) + calc(1em * var(--line-height)));
}
.m-toast-enter,
.m-toast-leave-to {
  max-height: 0;
  padding: 0;
  opacity: 0;
}
.m-toast-enter {
  transform: translateY(calc(var(--space-4) * -1)) scale(0.8);
}
.m-toast-leave-to {
  transform: scale(0.8);
}
</style>
