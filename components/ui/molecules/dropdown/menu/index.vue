<template>
  <nav class="m-dropdown__menu">
    <slot />
  </nav>
</template>
<style>
.m-dropdown__menu {
  display: flex;
  flex-direction: column;
  padding: var(--space-1) 0;
}
</style>
