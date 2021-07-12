<template>
  <svg id="canvas" ref="canvas" viewBox="0 0 600 600" class="c-canvas">
    <polyline
      v-for="polyline in polylines"
      :key="polyline.id"
      :points="polyline.points"
    />
  </svg>
</template>
<script>
export default {
  props: {
    day: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      polylines: []
    }
  },
  computed: {},
  watch: {
    active(newVal, oldVal) {
      if(newVal === true) {
        this.$refs.canvas.addEventListener('mousedown', this.start)
        this.$refs.canvas.addEventListener('touchstart', this.start)
      } else {
        this.$refs.canvas.removeEventListener('mousedown', this.start)
        this.$refs.canvas.removeEventListener('touchstart', this.start)
      }
    }
  },
  mounted() {
    this.loadPolylinesFromLocalStorage()
  },
  methods: {
    getRandomId() {
      let result = ''
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    },
    start(event) {
      this.addPolyline(event)
      this.$refs.canvas.addEventListener('mousemove', this.draw)
      this.$refs.canvas.addEventListener('touchmove', this.draw)
      this.$refs.canvas.addEventListener('mouseleave', this.stop)
      this.$refs.canvas.addEventListener('mouseup', this.stop)
      this.$refs.canvas.addEventListener('touchend', this.stop)
      this.$refs.canvas.addEventListener('touchcancel', this.stop)
    },
    stop() {
      this.$refs.canvas.removeEventListener('mousemove', this.draw)
      this.$refs.canvas.removeEventListener('touchmove', this.draw)
      this.$refs.canvas.removeEventListener('mouseleave', this.stop)
      this.$refs.canvas.removeEventListener('mouseup', this.stop)
      this.$refs.canvas.removeEventListener('touchend', this.stop)
      this.$refs.canvas.removeEventListener('touchcancel', this.stop)
      this.saveToLocalStore()
    },
    addPolyline(event) {
      this.polylines.push({ id: this.getRandomId(), points: '' })
      this.draw(event)
      this.draw(event)
    },
    draw(event) {
      event.preventDefault()
      const coords = this.getCoords(event)
      const index = this.polylines.length - 1
      this.polylines[index].points +=
        this.polylines[index].points === ''
          ? `${coords.x} ${coords.y}`
          : `,${coords.x} ${coords.y}`
    },
    getCoords(event) {
      const clientX = event.clientX || event.touches[0].clientX
      const clientY = event.clientY || event.touches[0].clientY
      const rect = this.$refs.canvas.getBoundingClientRect()
      const responsiveFactor = 600 / rect.width
      const coords = {
        x: ((clientX - rect.x) * responsiveFactor).toFixed(2),
        y: ((clientY - rect.y) * responsiveFactor).toFixed(2)
      }
      return coords
    },
    getDateFromDayOfYear(dayOfYear) {
      const currentYear = new Date().getFullYear()
      const date = new Date(Date.UTC(currentYear, 0, dayOfYear))
        .toISOString()
        .slice(0, 10)
      return date
    },
    saveToLocalStore() {
      window.localStorage.setItem(
        this.getDateFromDayOfYear(this.day),
        JSON.stringify(this.polylines)
      )
    },
    loadPolylinesFromLocalStorage() {
      const polylines = JSON.parse(
        window.localStorage.getItem(this.getDateFromDayOfYear(this.day))
      )
      if (!polylines) return
      this.polylines.push(...polylines)
    }
  }
}
</script>
<style>
.c-canvas {
  background: #ffde34;
  border-radius: 100%;
}
.c-canvas polyline {
  fill: none;
  stroke: black;
  stroke-width: 60;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}
</style>
