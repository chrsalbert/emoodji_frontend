<template>
  <div>
    <!-- <div class="header">
      <div>links</div>
      <div>recjts</div>
    </div> -->
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.state.auth.user) {
      return redirect('/poster')
    }
  }
}
</script>
<style scoped>
.header {
  height: 100vh;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}
.header div:first-child {
  flex: 6 0 18rem;
}
.header div:last-child {
  flex: 4 0 18rem;
  background: var(--color-primary-500);
  margin-left: calc(calc(var(--space-24) + 8vw) * -1);
  border-radius: 0 0 0 calc(var(--space-4) + 2vw);
}
</style>
