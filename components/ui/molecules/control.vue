<template>
  <div class="m-control" :class="classes">
    <div class="m-control__body">
      <a-label v-if="!hideLabel" class="m-control__label" :for="labelFor">
        {{ label }}
        <span v-if="optional" class="m-control__optional"> – optional </span>
      </a-label>
      <slot :onInput="onInput" :onFocus="onFocus" :onBlur="onBlur" />
    </div>
    <div v-if="errorText" class="m-control__error">
      {{ errorText }}
    </div>
    <div v-if="hasSlotHint" class="m-control__hint">
      <slot name="hint" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    labelFor: {
      type: String,
      required: true
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    optional: {
      type: Boolean,
      default: false
    },
    floatLabel: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      hasInput: false,
      hasFocus: false
    }
  },
  computed: {
    hasSlotHint() {
      return !!this.$slots.hint
    },
    classes() {
      return {
        'm-control--floatLabel': this.floatLabel,
        'm-control--hasInput': this.hasInput,
        'm-control--hasFocus': this.hasFocus
      }
    }
  },
  methods: {
    onInput(val) {
      this.hasInput = !!val
    },
    onFocus() {
      this.hasFocus = true
    },
    onBlur() {
      this.hasFocus = false
    }
  }
}
</script>
<style>
.m-control__body {
  position: relative;
}
.m-control__label {
  margin: 0 0 var(--space-1);
}
.m-control__optional,
.m-control__hint,
.m-control__error {
  color: var(--color-gray-500);
  font-weight: var(--font-regular);
  font-size: var(--font-2xs);
  line-height: var(--line-height-sm);
}
.m-control__hint,
.m-control__error {
  font-size: var(--font-sm);
  margin: var(--space-1) 0 0;
}
.m-control__error {
  color: var(--color-negative-500);
}

/*
 *  Float label
 */
.m-control--floatLabel .m-control__label {
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  left: calc(var(--control-pad) - 0.25em);
  margin: 0;
  padding: 0 0.25em;
  line-height: var(--line-height-sm);
  transition: all 0.15s;
  pointer-events: none;
}
.m-control--floatLabel.m-control--hasInput .m-control__label,
.m-control--floatLabel.m-control--hasFocus .m-control__label {
  align-items: flex-start;
  top: calc(-0.5em * var(--line-height-sm) + var(--control-border-width));
  bottom: auto;
  background: var(--color-white);
  font-size: var(--font-sm);
}
</style>
