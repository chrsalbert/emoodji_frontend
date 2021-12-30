<template>
  <component
    :is="isTag"
    :href="href"
    :to="to"
    :class="classes"
    class="a-button"
  >
    <span v-if="iconPrepend || iconName" class="a-button__icon">
      <a-icon :icon-name="iconPrepend || iconName" />
    </span>
    <span>
      <slot />
    </span>
    <span v-if="showLoader" class="a-button__icon">
      <a-icon icon-name="loader" />
    </span>
    <span v-if="iconAppend" class="a-button__icon">
      <a-icon :icon-name="iconAppend" />
    </span>
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
    iconName: {
      type: String,
      default: null
    },
    iconAppend: {
      type: String,
      default: null
    },
    iconPrepend: {
      type: String,
      default: null
    },
    showLoader: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    chameleon: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: null,
      validator: value => ['secondary', 'light'].includes(value)
    },
    size: {
      type: String,
      default: null,
      validator: value => ['xs', 'sm', 'lg', 'xl', '2xl'].includes(value)
    }
  },
  computed: {
    classes() {
      return {
        'a-button--xs': this.size === 'xs',
        'a-button--sm': this.size === 'sm',
        'a-button--lg': this.size === 'lg',
        'a-button--xl': this.size === 'xl',
        'a-button--2xl': this.size === '2xl',
        'a-button--secondary': this.variant === 'secondary',
        'a-button--light': this.variant === 'light',
        'a-button--ghost': this.ghost,
        'a-button--chameleon': this.chameleon,
        'a-button--show-loader': this.showLoader,
        'a-button--icon': this.iconName,
        'a-button--link': this.link,
        'a-button--full': this.full
      }
    },
    isTag() {
      if (this.href) {
        return 'a'
      }
      if (this.to) {
        return 'nuxt-link'
      }
      return 'button'
    }
  }
}
</script>
<style>
.a-button {
  --a-button-padding: 0 calc(var(--a-button-size, var(--control-md)) / 2);
  position: relative;
  display: inline-block;
  height: var(--a-button-size, var(--control-md));
  width: var(--a-button-width, auto);
  padding: var(--a-button-padding);
  border-radius: var(--btn-border-radius);
  border: var(--control-border-width) transparent solid;
  background: var(--a-button-bg-color);
  color: var(--a-button-text-color);
  font-size: calc(var(--a-button-size) / 2.8);
  font-weight: var(--font-weight-bold);
  line-height: calc(
    var(--a-button-size, var(--control-md)) -
      calc(var(--control-border-width) * 2)
  );
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s;
}
.a-button__icon {
  position: relative;
  display: inline-block;
  width: calc(var(--a-button-size, var(--control-md)) / 1.6);
  height: calc(var(--a-button-size, var(--control-md)) / 1.6);
  vertical-align: middle;
  top: -0.1em;
}
.a-button:not(.a-button--icon) .a-button__icon:first-child {
  left: -0.5em;
}
.a-button:not(.a-button--icon) .a-button__icon:last-child {
  right: -0.5em;
}
.a-button:not(.a-button:disabled):hover {
  background: var(--a-button-bg-color-hover);
}
.a-button:focus {
  background: var(--a-button-bg-color-focus);
}
.a-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/*
 *  Variants
 */
.a-button {
  --a-button-text-color: var(--btn-primary-text-color);
  --a-button-text-color-hover: var(--btn-primary-text-color-hover);
  --a-button-text-color-focus: var(--btn-primary-text-color-focus);
  --a-button-border-color: var(--btn-primary-border-color);
  --a-button-border-color-hover: var(--btn-primary-border-color-hover);
  --a-button-border-color-focus: var(--btn-primary-border-color-focus);
  --a-button-bg-color: var(--btn-primary-bg-color);
  --a-button-bg-color-hover: var(--btn-primary-bg-color-hover);
  --a-button-bg-color-focus: var(--btn-primary-bg-color-focus);
  --a-button-ghost-color: var(--btn-primary-ghost-color);
}

.a-button--secondary {
  --a-button-text-color: var(--btn-secondary-text-color);
  --a-button-text-color-hover: var(--btn-secondary-text-color-hover);
  --a-button-text-color-focus: var(--btn-secondary-text-color-focus);
  --a-button-border-color: var(--btn-secondary-border-color);
  --a-button-border-color-hover: var(--btn-secondary-border-color-hover);
  --a-button-border-color-focus: var(--btn-secondary-border-color-focus);
  --a-button-bg-color: var(--btn-secondary-bg-color);
  --a-button-bg-color-hover: var(--btn-secondary-bg-color-hover);
  --a-button-bg-color-focus: var(--btn-secondary-bg-color-focus);
  --a-button-ghost-color: var(--btn-secondary-ghost-color);
}

.a-button--light {
  --a-button-text-color: var(--btn-light-text-color);
  --a-button-text-color-hover: var(--btn-light-text-color-hover);
  --a-button-text-color-focus: var(--btn-light-text-color-focus);
  --a-button-border-color: var(--btn-light-border-color);
  --a-button-border-color-hover: var(--btn-light-border-color-hover);
  --a-button-border-color-focus: var(--btn-light-border-color-focus);
  --a-button-bg-color: var(--btn-light-bg-color);
  --a-button-bg-color-hover: var(--btn-light-bg-color-hover);
  --a-button-bg-color-focus: var(--btn-light-bg-color-focus);
  --a-button-ghost-color: var(--btn-light-ghost-color);
}

/*
 *  Size
 */
.a-button--sm {
  --a-button-size: var(--control-sm);
}
.a-button--xs {
  --a-button-size: var(--control-xs);
}
.a-button--lg {
  --a-button-size: var(--control-lg);
}
.a-button--xl {
  --a-button-size: var(--control-xl);
}
.a-button--2xl {
  --a-button-size: var(--control-2xl);
}

/*
 *  Ghost
 */
.a-button--ghost {
  --a-button-bg-color: transparent;
  --a-button-bg-color-hover: transparent;
  --a-button-bg-color-focus: transparent;
  --a-button-text-color: var(--a-button-ghost-color);
}

/*
 *  Chameleon
 */
.a-button--chameleon {
  --a-button-bg-color: transparent;
  --a-button-bg-color-hover: transparent;
  --a-button-bg-color-focus: transparent;
  --a-button-text-color: currentColor;
}

/*
 *  Icon
 */
.a-button--icon {
  --a-button-padding: 0;
  --a-button-width: var(--a-button-size, var(--control-md));
}

/*
 *  Full
 */
.a-button--full {
  width: 100%;
}

/*
 *  Link
 */
.a-button--link {
  padding: 0;
}

/*
 *  Loader
 */
.a-button--show-loader > span:not(.a-button__icon) {
  visibility: hidden;
}
.a-button--show-loader > .a-button__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
