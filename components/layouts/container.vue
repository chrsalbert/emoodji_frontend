<template>
  <component
    :is="tag"
    class="l-container"
    :class="{
      'l-container--sm': width === 'sm',
      'l-container--xs': width === 'xs',
      'l-container--2xs': width === '2xs'
    }"
  >
    <slot />
  </component>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    width: {
      type: String,
      default: null,
      validator: value => {
        return ['2xs', 'xs', 'sm'].includes(value)
      }
    }
  }
}
</script>
<style>
.l-container {
  --l-container-width: var(--body-md);
  width: 100%;
  max-width: var(--l-container-width);
  margin: 0 auto;
}
.l-container--sm {
  --l-container-width: var(--body-sm);
}
.l-container--xs {
  --l-container-width: var(--body-xs);
}
.l-container--2xs {
  --l-container-width: var(--body-2xs);
}
</style>
