<template>
  <div class="a-smiley">
    <svg
      viewBox="0 0 511 514"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ '--rotate': `${rotate}deg` }"
    >
      <circle
        cx="428.637"
        cy="178.084"
        r="24"
        transform="rotate(13.9691 428.637 178.084)"
        fill="black"
      />
      <circle
        cx="293.512"
        cy="178.484"
        r="24"
        transform="rotate(13.9691 293.512 178.484)"
        fill="black"
      />
      <circle
        v-if="mood === 'invisible'"
        cx="294.084"
        cy="172.084"
        r="24"
        transform="rotate(13.9691 294.084 172.084)"
        fill="var(--color-primary-500)"
      />
      <circle
        v-if="mood === 'invisible'"
        cx="429.084"
        cy="172.084"
        r="24"
        transform="rotate(13.9691 429.084 172.084)"
        fill="var(--color-primary-500)"
      />
      <path
        class="a-smiley__mouth"
        :data-state="mood"
        stroke="#161616"
        stroke-width="24"
        stroke-linecap="round"
        shape-rendering="geometricPrecision"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    mood: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      rotate: 0
    }
  },
  mounted() {
    window.addEventListener('mousemove', e => {
      const percentage = (100 / (window.innerHeight / 2)) * e.clientY
      this.rotate = (30 / 100) * percentage
    })
  }
}
</script>
<style>
.a-smiley {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-primary-500);
  border-radius: 50%;
  transform: rotate(-30deg);
}
.a-smiley > svg {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
  transform: rotate(var(--rotate));
}
.a-smiley__mouth {
  d: path('M257.719 313.932C288.773 332.947 369.286 359.644 442.905 314.314');
  transition: all 0.3s ease;
}
.a-smiley__mouth[data-state='happy'] {
  d: path('M251 297.5C277.5 327.5 366.5 379.5 452 301');
}

.a-smiley__mouth[data-state='sad'] {
  d: path('M302 323.648C346.981 296.857 400.834 303.812 433.826 320.298');
}
</style>
