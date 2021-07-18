<template>
  <transition name="c-toolbar" mode="out-in">
    <div v-if="posterItemOpen" class="c-toolbar">
      <div class="c-toolbar__top">
        <c-button @click.native="undo()">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 25.2754C24 24.0387 41.5 18.7826 43.5 29.9131C45.1542 39.1192 37.5 47.0725 29 48M20 25.2754L27 16M20 25.2754L29 29.9131"
              stroke="black"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </c-button>
        <c-button @click.native="toggleColor()">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="16" :fill="strokeColor" />
          </svg>
        </c-button>
        <c-button @click.native="close()">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 18C24.6667 24.2222 39.6 38.5333 46 46M18 46C24.7778 37.8189 39.5333 20.7654 44.3333 18"
              stroke="black"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </c-button>
      </div>
      <div class="c-toolbar__strokeBox">
        <label for="strokeWidth" aria-label="Stroke width">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 22.3281C20.2385 19.3214 28.8743 14.002 29.5101 16.7774C30.3048 20.2465 12.8212 31.3479 19.1788 32.0418C25.5365 32.7356 33.4837 18.1651 38.2519 22.3281C43.0202 26.4911 15.2053 40.3678 22.3577 42.4493C29.5101 44.5308 41.4308 26.4911 46.9938 29.2664C52.5568 32.0418 32.689 41.7555 44.6096 48"
              stroke="black"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </label>
        <p>{{ form.fields.strokeWidth.value }}</p>
        <div class="c-toolbar__strokeInput">
          <input
            id="strokeWidth"
            v-model="form.fields.strokeWidth.value"
            min="1"
            max="120"
            type="range"
            orient="vertical"
            @change="setStrokeWidth(form.fields.strokeWidth.value)"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        fields: {
          strokeWidth: {
            value: 60
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      posterItemOpen: 'poster/getPosterItemOpen',
      strokeColor: 'poster/getStrokeColor'
    })
  },
  methods: {
    ...mapMutations({
      setStrokeWidth: 'poster/SET_STROKE_WIDTH',
      setStrokeColor: 'poster/SET_STROKE_COLOR'
    }),
    toggleColor() {
      const newColor = this.strokeColor === '#000000' ? '#ffde34' : '#000000'
      this.setStrokeColor(newColor)
    },
    undo() {
      this.$nuxt.$emit('poster-undo')
    },
    close() {
      this.$nuxt.$emit('poster-close')
    }
  }
}
</script>

<style>
.c-toolbar {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 3;
  transition: all 0.15s ease-out 0.15s;
}
.c-toolbar__top {
  display: flex;
  margin: 0 0 0.5rem;
}
.c-toolbar__top > * {
  margin-right: 0.5rem;
}
.c-toolbar__strokeBox {
  display: grid;
  grid-template-rows: max-content max-content 1fr;
  grid-gap: 0.5rem;
  width: 4rem;
  border: 2px black solid;
  background: white;
  padding: 0.5rem 0;
  border-radius: 99rem;
  text-align: center;
  box-shadow: 3px 3px 0px #000000, 2px 2px 0px #000000, 1px 1px 0px #000000;
}
.c-toolbar__strokeBox svg {
  width: 3rem;
  height: 3rem;
}
.c-toolbar__strokeInput {
  position: relative;
  height: 8rem;
}
.c-toolbar__strokeInput > input {
  position: absolute;
  transform: rotate(-90deg);
  transform-origin: bottom left;
  left: calc(50% + 8px);
  top: calc(100% - 16px);
}
.c-toolbar-enter,
.c-toolbar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.c-toolbar-leave,
.c-toolbar-enter-to {
  transform: translateX(0);
  opacity: 1;
}
</style>
