<template>
  <button class="c-button">
    <slot />
  </button>
</template>
<style>
.c-button {
  display: block;
  padding: 0;
  height: 4rem;
  width: 4rem;
  padding: 0.5rem;
  border-radius: 99rem;
  border: 2px #000 solid;
  background: #fff;
  box-shadow: 3px 3px 0px #000000, 2px 2px 0px #000000, 1px 1px 0px #000000;
  cursor: pointer;
}
.c-button:hover {
  position: relative;
  top: 1px;
  left: 1px;
  box-shadow: 2px 2px 0px #000000, 1px 1px 0px #000000;
}
.c-button > svg {
  width: 100%;
  height: 100%;
}
</style>
