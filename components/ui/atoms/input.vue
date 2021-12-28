<template>
  <input
    v-model="input"
    :class="classes"
    class="_formElement a-input"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
<script>
import formElements from '@/mixins/components/formElements'

export default {
  mixins: [formElements],
  props: {
    noSpin: {
      type: Boolean,
      default: false
    },
    honeyPot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        '_formElement--xs': this.size === 'xs',
        '_formElement--sm': this.size === 'sm',
        '_formElement--lg': this.size === 'lg',
        '_formElement--xl': this.size === 'xl',
        '_formElement--2xl': this.size === '2xl',
        '_formElement--invalid': this.invalid,
        'a-input--honeyPot': this.honeyPot,
        'a-input--noSpin': this.noSpin
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

/*
 *  No spin
 */
.a-input--noSpin::-webkit-outer-spin-button,
.a-input--noSpin::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.a-input--noSpin {
  -moz-appearance: textfield;
}

/*
 *  Honey pot
 */
.a-input--honeyPot {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
}

/*
 *  Range
 */
input[type='range'] {
  width: 100%;
  margin: 4px 0;
  background-color: transparent;
  -webkit-appearance: none;
}
input[type='range']:focus {
  outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  border-radius: 8px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type='range']::-webkit-slider-thumb {
  margin-top: -4px;
  width: 16px;
  height: 16px;
  background: #000000;
  border: 0px solid rgba(0, 0, 0, 0);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type='range']:focus::-webkit-slider-runnable-track {
  background: var(--color-primary-500);
}
input[type='range']::-moz-range-track {
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  border-radius: 8px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #000000;
  border: 0px solid rgba(0, 0, 0, 0);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
input[type='range']::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 4px 0;
  color: transparent;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type='range']::-ms-fill-lower {
  background: #000000;
  border: 0;
  border-radius: 16px;
}
input[type='range']::-ms-fill-upper {
  background: rgba(0, 0, 0, 0.2);
  border: 0;
  border-radius: 16px;
}
input[type='range']::-ms-thumb {
  width: 16px;
  height: 16px;
  background: #000000;
  border: 0px solid rgba(0, 0, 0, 0);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}
input[type='range']:focus::-ms-fill-lower {
  background: rgba(0, 0, 0, 0.2);
}
input[type='range']:focus::-ms-fill-upper {
  background: var(--color-primary-500);
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align: auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type='range'] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}
</style>
