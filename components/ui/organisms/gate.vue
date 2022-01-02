<template>
  <div class="l-gate">
    <div class="l-gate__logo">
      <nuxt-link to="/" class="u-link-plain"
        ><img src="~/assets/images/logo.svg?raw"
      /></nuxt-link>
    </div>
    <div class="l-gate__figure">
      <div class="l-gate__figure__wrapper">
        <slot name="figure" />
      </div>
    </div>
    <div class="l-gate__content">
      <slot name="content" />
    </div>
  </div>
</template>
<style>
.l-gate {
  background: var(--color-primary-500);
  min-height: 100vh;
}
.l-gate__logo {
  z-index: 1;
  padding: var(--space-8) calc(var(--space-4) + 2vw) 0;
  background: #fff;
  border-radius: 0 0 0 2rem;
}
.l-gate__figure {
  display: none;
}
.l-gate__content {
  padding: calc(var(--space-8) + 2vw);
}
.l-gate__content a {
  text-decoration: underline;
}
@media screen and (min-width: 768px) {
  .l-gate {
    display: flex;
    flex-wrap: wrap;
  }
  .l-gate__logo {
    position: absolute;
  }
  .l-gate__figure {
    position: relative;
    flex: 6 0 18rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .l-gate__figure__wrapper {
    width: min(100%, 90vh);
    max-width: 62vh;
    aspect-ratio: 1;
    padding: calc(var(--space-8) + 2vw) calc(var(--space-16) + 2vw);
  }
  .l-gate__content {
    flex: 4 0 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
