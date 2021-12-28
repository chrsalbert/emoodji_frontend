<template>
  <div class="l-default container">
    <o-header />
    <div class="l-default__body">
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Default',
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout() // this method will logout the user and make token to false on the local storage of the user browser
    }
  }
}
</script>
<style>
.l-default__body {
  margin: var(--space-8) var(--body-pad);
}
.c-header {
  z-index: var(--z-header);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: var(--space-2) 0;
  color: var(--color-black);
}
.c-header__nav {
  display: flex;
  align-items: center;
}
.c-header__nav > div:last-child {
  flex: 1;
  text-align: right;
}
.c-header__nav > div:last-child a {
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
}
.c-header__logo {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
}
</style>
