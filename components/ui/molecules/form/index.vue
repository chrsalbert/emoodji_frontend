<template>
  <form ref="form" class="m-form" :style="{ '--m-form-gap': gap }">
    <slot />
    <div class="m-form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>
<script>
export default {
  props: {
    gap: {
      type: String,
      default: null
    }
  },
  watch: {
    notice: {
      deep: true,
      handler() {
        this.scrollIntoView()
      }
    }
  },
  methods: {
    scrollIntoView() {
      const y = this.$refs.form.offsetTop - 16
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style>
.m-form > *:not(:last-child) {
  margin: 0 0 var(--m-form-gap, var(--space-2));
}
.m-form__actions {
  margin: var(--space-8) 0 0;
}
</style>
