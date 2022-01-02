<template>
  <div class="o-loading" :class="classes">
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="40" cy="40" r="40" fill="#FEE04F" />
        <circle cx="33" cy="32" r="3" fill="black" />
        <circle cx="46" cy="32" r="3" fill="black" />
        <path
          d="M27 50C31.1667 52.5 42 56 52 50"
          stroke="black"
          stroke-width="4"
          stroke-linecap="round"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    fullsize: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'o-loading--finished': !this.loading,
        'o-loading--fullsize': this.fullsize
      }
    }
  }
}
</script>
<style>
.o-loading {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.o-loading svg {
  animation: breathing 1s ease-out infinite normal;
  filter: blur(0px);
}
.o-loading--finished svg {
  animation: blowUp 1s ease-out normal forwards;
}
.o-loading--fullsize {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
