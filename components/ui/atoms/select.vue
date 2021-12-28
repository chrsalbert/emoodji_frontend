<template>
  <div class="a-select" :class="classes">
    <select v-model="input">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="_formElement a-select__element">
      <span class="a-select__text">
        {{ text }}
      </span>
      <div class="a-select__icon">
        <a-icon icon-name="chevron-down" />
      </div>
    </div>
  </div>
</template>
<script>
import formElements from '@/mixins/components/formElements'

export default {
  mixins: [formElements],
  props: {
    placeholder: {
      type: String,
      default: 'Bitte wählen'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    classes() {
      return {
        'a-select--placeholder': !this.value
      }
    },
    text() {
      return (
        this.options.find(option => option.id === this.value)?.text ||
        this.placeholder
      )
    },
    input: {
      get() {
        return this.value
      },
      set(val) {
        this.selected = val
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style>
@import '@/assets/css/components/formElements.css';

.a-select {
  position: relative;
}
.a-select__element {
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}
.a-select__text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.a-select__icon {
  flex-shrink: 0;
  width: 1.5em;
  height: 1.5em;
}
.a-select > select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border: none;
  border-radius: var(--control-border-radius);
  -webkit-appearance: none;
  opacity: 0;
}

/*
 *  Placeholder
 */
.a-select--placeholder .a-select__element {
  color: var(--color-gray-500);
}
</style>
