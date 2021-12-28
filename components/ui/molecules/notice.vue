<template>
  <div
    class="m-notice"
    :class="{
      'm-notice--error': variant === 'error',
      'm-notice--success': variant === 'success',
    }"
    :style="{ '--stack': stack }"
  >
    <div class="m-notice__header__icon">
      <e-icon :icon="icon" :stroke-width="1.5" />
    </div>
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: null,
    },
    stack: {
      type: String,
      default: '0',
    },
  },
  computed: {
    icon() {
      if (this.variant === 'success') {
        return 'circle-check'
      }
      return 'circle-alert'
    },
  },
}
</script>
<style>
.m-notice {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--stack);
}
.m-notice__header__icon {
  width: var(--font-size-lg);
  line-height: 0;
}
.m-notice--success {
  color: var(--color-positive-600)
}
</style>
