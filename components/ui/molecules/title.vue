<template>
  <div
    class="m-title"
    :class="{
      'm-title--block': variant === 'block',
      'm-title--page': variant === 'page',
      'm-title--center': center
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    variant: {
      type: String,
      default: null
    },
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.m-title > h1 {
  font-size: var(--font-3xl);
  margin: 0 0 var(--space-12);
}
.m-title p:first-of-type {
  margin: calc(var(--space-10) * -1) 0 var(--space-12);
}
.m-title p {
  font-size: var(--font-lg);
}

/* variant: block */
.m-title--block p {
  font-size: var(--font-xl);
}

/* variant: center */
.m-title--center {
  text-align: center;
}

/* variant: page */
.m-title--page {
  margin: 0 0 var(--space-16);
}
.m-title--page h1 {
  margin: 0;
}
.m-title--page p:first-of-type {
  margin: var(--space-4) 0 0;
}
</style>
