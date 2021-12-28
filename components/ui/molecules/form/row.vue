<template>
  <div class="m-form-row">
    <slot />
  </div>
</template>
<style>
.m-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.m-form-row > * {
  flex: 1 0;
}
</style>
