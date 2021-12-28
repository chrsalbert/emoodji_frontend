<template>
  <component :is="tag ? tag : level" :class="classes" :style="styles">
    <slot />
  </component>
</template>
<script>
export default {
  props: {
    level: {
      type: String,
      default: 'h1',
      validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
    tag: {
      type: String,
      default: null,
      validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
    maxWidth: {
      type: String,
      default: null
    },
    stack: {
      type: String,
      default: null
    }
  },
  computed: {
    classes() {
      return {
        'a-h1': this.level === 'h1',
        'a-h2': this.level === 'h2',
        'a-h3': this.level === 'h3',
        'a-h4': this.level === 'h4',
        'a-h5': this.level === 'h5',
        'a-h6': this.level === 'h6'
      }
    },
    styles() {
      return {
        '--a-headline-max-width': this.maxWidth,
        '--a-headline-stack': this.stack
      }
    }
  }
}
</script>
<style>
.a-h1,
.a-h2,
.a-h3,
.a-h4,
.a-h5,
.a-h6 {
  max-width: var(--a-headline-max-width, auto);
  margin-bottom: var(--a-headline-stack, 0);
  font-weight: var(--font-regular);
  line-height: var(--line-height-sm);
}
.a-h1 {
  font-size: var(--font-3xl);
}
.a-h2 {
  font-size: var(--font-2xl);
}
.a-h3 {
  font-size: var(--font-xl);
}
.a-h4 {
  font-size: var(--font-lg);
}
.a-h5 {
  font-size: var(--font-md);
}
.a-h6 {
  font-size: var(--font-sm);
}
</style>
