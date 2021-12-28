<template>
  <textarea
    v-model="input"
    :class="classes"
    class="_formElement a-textarea"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
<script>
import formElements from '@/mixins/components/formElements'

export default {
  mixins: [formElements],
  computed: {
    classes() {
      return {
        '_formElement--xs': this.size === 'xs',
        '_formElement--sm': this.size === 'sm',
        '_formElement--lg': this.size === 'lg',
        '_formElement--xl': this.size === 'xl',
        '_formElement--2xl': this.size === '2xl',
        '_formElement--invalid': this.invalid
      }
    },
    input: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style>
@import '@/assets/css/components/formElements.css';

.a-textarea {
  height: calc(4em * var(--line-height));
  padding-top: calc(calc(1em * var(--line-height)) / 2);
}
</style>
