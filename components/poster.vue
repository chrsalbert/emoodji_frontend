<template>
  <ul class="c-poster">
    <c-poster-item
      v-for="i in 365"
      :key="i"
      :ref="`item${i}`"
      :day="i"
    />
    <li><c-backdrop /></li>
  </ul>
</template>
<style>
.c-poster {
  display: grid;
  margin: 0 auto;
  max-width: 100rem;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: min(2vh, 2vw);
}
.c-poster > li {
  position: relative;
  list-style: none;
  padding-top: 100%;
}
</style>
