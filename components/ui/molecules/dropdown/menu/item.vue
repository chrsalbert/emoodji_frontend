<template>
  <component
    :is="isTag"
    :href="href"
    :to="to"
    class="m-dropdown__menu__item"
    :class="classes"
    @click.native="onClick()"
  >
    <slot />
  </component>
</template>
<script>
export default {
  props: {
    href: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    variant: {
      type: String,
      default: null,
      validator: value => ['secondary'].includes(value)
    },
    divider: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isTag() {
      if (this.href) {
        return 'a'
      }
      if (this.to) {
        return 'nuxt-link'
      }
      return 'button'
    },
    classes() {
      return {
        'm-dropdown__menu__item--secondary': this.variant === 'secondary',
        'm-dropdown__menu__item--divider': this.divider
      }
    }
  },
  methods: {
    onClick() {
      this.$nuxt.$emit('m-dropdown--item-clicked')
    }
  }
}
</script>
<style>
.m-dropdown__menu__item {
  flex: 1;
  display: block;
  padding: var(--space-2) var(--control-pad);
  background: none;
  border: none;
  text-align: left;
  text-decoration: none;
  line-height: var(--line-height-sm);
  cursor: pointer;
  margin: 0 var(--space-1);
  border-radius: var(--border-radius-1);
  transition: all 0.15s;
}
.m-dropdown__menu__item:hover {
  background: var(--color-gray-100);
}

/*
 *  Divider
 */
.m-dropdown__menu__item--divider {
  position: relative;
  margin-bottom: var(--space-2);
}

.m-dropdown__menu__item--divider::after {
  content: '';
  position: absolute;
  right: var(--space-2);
  bottom: calc(var(--space-1) * -1);
  left: var(--space-2);
  transform: translateY(-50%);
  height: 1px;
  background: var(--color-gray-200);
}

/*
 *  Variants
 */
.m-dropdown__menu__item--secondary {
  font-size: var(--font-sm);
  color: var(--color-gray-400);
}
</style>
