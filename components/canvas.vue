<template>
  <svg
    id="canvas"
    ref="canvas"
    viewBox="0 0 600 600"
    class="c-canvas"
    :class="{ 'c-canvas--active': active }"
    :style="{ '--stroke-width': strokeWidth }"
  >
    <polyline
      v-for="polyline in polylines"
      :key="polyline.id"
      :points="polyline.points"
      :style="{
        '--stroke-width': polyline.strokeWidth,
        '--stroke-color': polyline.strokeColor
      }"
    />
    <circle
      v-if="active"
      :style="{ 'cx': cursor.cx, 'cy': cursor.cy, 'r': cursorRadius }"
    ></circle>
  </svg>
</template>
<script>
import { mapGetters } from 'vuex'
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
      polylines: [],
      cursor: {
        cx: 0,
        cy: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      strokeWidth: 'poster/getStrokeWidth',
      strokeColor: 'poster/getStrokeColor'
    }),
    cursorRadius() {
      return `${this.strokeWidth / 2}px`
    }
  },
  watch: {
    active(newVal, oldVal) {
      if (newVal === true) {
        this.$refs.canvas.addEventListener('mousedown', this.start)
        this.$refs.canvas.addEventListener('touchstart', this.start)
        this.$refs.canvas.addEventListener('mousemove', this.moveCursor)
      } else {
        this.$refs.canvas.removeEventListener('mousedown', this.start)
        this.$refs.canvas.removeEventListener('touchstart', this.start)
        this.$refs.canvas.removeEventListener('mousemove', this.moveCursor)
      }
    }
  },
  created() {
    this.$nuxt.$on('poster-undo', () => {
      if (!this.active) {
        return
      }
      this.undo()
    })
  },
  mounted() {
    this.loadPolylinesFromLocalStorage()
  },
  methods: {
    undo() {
      this.polylines = this.polylines.splice(0, this.polylines.length - 1)
    },
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
      this.polylines.push({
        id: this.getRandomId(),
        points: '',
        strokeWidth: this.strokeWidth,
        strokeColor: this.strokeColor
      })
      this.draw(event)
      this.draw(event)
    },
    moveCursor(event) {
      const coords = this.getCoords(event)
      this.cursor.cx = coords.x
      this.cursor.cy = coords.y
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
  background: var(--color-primary);
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.c-canvas:hover:not(.c-canvas--active) {
  transform: scale(1.1) rotate(3deg);
}
.c-canvas--active {
  cursor: none;
  box-shadow: rgba(255, 255, 255, 0.15) 0px 48px 100px 0px;
}
.c-canvas polyline {
  fill: none;
  stroke: var(--stroke-color, #000);
  stroke-width: var(--stroke-width, 60);
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}
.c-canvas circle {
  fill: transparent;
  stroke: white;
  mix-blend-mode: difference;
  stroke-width: 2;
}
</style>
