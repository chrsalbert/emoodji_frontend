<template>
  <div ref="dropdown" class="m-dropdown" :class="classes">
    <a-button
      v-if="button.text"
      v-bind="button.props"
      :icon-append="icon"
      @click.native="onToggle()"
    >
      {{ button.text }}
    </a-button>
    <a-button
      v-else
      :icon-name="icon"
      v-bind="button.props"
      @click.native="onToggle()"
    />
    <transition name="m-dropdown__content-">
      <div
        v-show="isOpen"
        ref="content"
        key="content"
        class="m-dropdown__content"
        :style="styles"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    button: {
      type: Object,
      default: () => {
        return {
          iconClose: null,
          iconOpen: null,
          text: null,
          props: null
        }
      }
    },
    menu: {
      type: Array,
      default: () => {
        return []
      }
    },
    position: {
      type: String,
      default: 'bottom',
      validator: value => ['top', 'right', 'bottom', 'left'].includes(value)
    },
    align: {
      type: String,
      default: 'end',
      validator: value => ['start', 'center', 'end'].includes(value)
    },
    minWidth: {
      type: String,
      default: '12rem'
    },
    width: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    classes() {
      return {
        'm-dropdown--position-top': this.position === 'top',
        'm-dropdown--position-right': this.position === 'right',
        'm-dropdown--position-bottom': this.position === 'bottom',
        'm-dropdown--position-left': this.position === 'left',
        'm-dropdown--align-start': this.align === 'start',
        'm-dropdown--align-center': this.align === 'center',
        'm-dropdown--align-end': this.align === 'end'
      }
    },
    styles() {
      return {
        '--min-width': this.minWidth,
        '--width': this.width
      }
    },
    icon() {
      return this.isOpen ? this.iconOpen : this.iconClose
    },
    iconClose() {
      return this.button.iconClose || 'chevron-down'
    },
    iconOpen() {
      return this.button.iconOpen || 'chevron-up'
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        window.addEventListener('resize', this.reposition)
      } else {
        window.removeEventListener('resize', this.reposition)
      }
    }
  },
  created() {
    this.$nuxt.$on('m-dropdown--open', element => {
      if (this.$refs.dropdown === element) {
        return
      }
      this.close()
    })
    this.$nuxt.$on('m-dropdown--item-clicked', () => {
      this.close()
    })
  },
  methods: {
    onToggle() {
      this.isOpen ? this.close() : this.open()
    },
    close() {
      this.isOpen = false
      window.removeEventListener('click', this.onDocumentClick)
    },
    open() {
      this.isOpen = true
      this.$nuxt.$emit('m-dropdown--open', this.$refs.dropdown)
      window.addEventListener('click', this.onDocumentClick)
      this.$nextTick(() => {
        this.reposition()
      })
    },
    onDocumentClick(e) {
      if (
        e.target !== this.$refs.dropdown &&
        !this.$refs.dropdown?.contains(e.target)
      ) {
        this.close()
      }
    },
    reposition() {
      const position = this.$refs.dropdown.getBoundingClientRect()
      const contentWidth = this.$refs.content.clientWidth
      this.alignRight = window.innerWidth - position.x - contentWidth < 0
    }
  }
}
</script>
<style>
.m-dropdown {
  display: inline-block;
  position: relative;
}
.m-dropdown__toggle {
  border-radius: 99rem;
}
.m-dropdown__content {
  position: absolute;
  z-index: var(--z-dropdown);
  min-width: var(--min-width, auto);
  width: var(--width, auto);
  background: var(--color-white);
  box-shadow: var(--shadow-3);
  border-radius: var(--border-radius-2);
  transform: translate3d(var(--translateX, 0), var(--translateY, 0), 0);
  transition: opacity 0.05s linear, left 0.2s ease-out, right 0.2s ease-out,
    top 0.2s ease-out, bottom 0.2s ease-out;
  opacity: 1;
}

.m-dropdown__content--enter,
.m-dropdown__content--leave-to {
  opacity: 0;
}

/*
 *  Position
 */
/* top */
.m-dropdown--position-top .m-dropdown__content,
.m-dropdown--position-top .m-dropdown__content--leave,
.m-dropdown--position-top .m-dropdown__content--enter-to {
  bottom: 100%;
  left: 0;
}

.m-dropdown--position-top .m-dropdown__content--enter,
.m-dropdown--position-top .m-dropdown__content--leave-to {
  bottom: calc(100% - 0.5rem);
}

/* right */
.m-dropdown--position-right .m-dropdown__content,
.m-dropdown--position-right .m-dropdown__content--leave,
.m-dropdown--position-right .m-dropdown__content--enter-to {
  top: 0;
  left: 100%;
}

.m-dropdown--position-right .m-dropdown__content--enter,
.m-dropdown--position-right .m-dropdown__content--leave-to {
  left: calc(100% - 0.5rem);
}

/* bottom */
.m-dropdown--position-bottom .m-dropdown__content,
.m-dropdown--position-bottom .m-dropdown__content--leave,
.m-dropdown--position-bottom .m-dropdown__content--enter-to {
  top: 100%;
  left: 0;
}

.m-dropdown--position-bottom .m-dropdown__content--enter,
.m-dropdown--position-bottom .m-dropdown__content--leave-to {
  top: calc(100% - 0.5rem);
}

/* left */
.m-dropdown--position-left .m-dropdown__content,
.m-dropdown--position-left .m-dropdown__content--leave,
.m-dropdown--position-left .m-dropdown__content--enter-to {
  top: 0;
  right: 100%;
}

.m-dropdown--position-left .m-dropdown__content--enter,
.m-dropdown--position-left .m-dropdown__content--leave-to {
  right: calc(100% - 0.5rem);
}

/*
 *  Align
 */
.m-dropdown--align-center.m-dropdown--position-right .m-dropdown__content,
.m-dropdown--align-center.m-dropdown--position-left .m-dropdown__content {
  top: 50%;
  --translateY: -50%;
}

.m-dropdown--align-center.m-dropdown--position-top .m-dropdown__content,
.m-dropdown--align-center.m-dropdown--position-bottom .m-dropdown__content {
  --translateX: -50%;
  left: 50%;
}

.m-dropdown--align-end.m-dropdown--position-right .m-dropdown__content,
.m-dropdown--align-end.m-dropdown--position-left .m-dropdown__content {
  top: auto;
  bottom: 0;
}

.m-dropdown--align-end.m-dropdown--position-top .m-dropdown__content,
.m-dropdown--align-end.m-dropdown--position-bottom .m-dropdown__content {
  left: auto;
  right: 0;
}
</style>
