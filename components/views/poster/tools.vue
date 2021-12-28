<template>
  <transition name="o-tools" :style="{ '--o-tools--strokeColor': strokeColor }">
    <div v-if="isVisible" class="o-tools">
      <div class="o-tools__bar">
        <div class="o-tools__bar__group">
          <m-dropdown
            :button="{
              props: {
                chameleon: true
              },
              iconOpen: 'palette',
              iconClose: 'palette'
            }"
            position="top"
            align="center"
            min-width="auto"
          >
            <div class="o-tools__color">
              <input
                id="black"
                v-model="strokeColorInput"
                type="radio"
                value="#000000"
                name="color"
              />
              <label for="black" style="--color: #000000">Black</label>
              <input
                id="yellow"
                v-model="strokeColorInput"
                type="radio"
                value="#ffde34"
                name="color"
              />
              <label for="yellow" style="--color: #ffde34">Yellow</label>
            </div>
          </m-dropdown>
          <m-dropdown
            :button="{
              props: {
                chameleon: true
              },
              iconOpen: 'stroke',
              iconClose: 'stroke'
            }"
            position="top"
            align="center"
            min-width="auto"
          >
            <div class="o-tools__strokeWidth">
              <input
                v-model="strokeWidthInput"
                type="range"
                min="10"
                max="100"
              />
              <div class="o-tools__strokeWidth__value">
                {{ strokeWidthInput }}
              </div>
            </div>
          </m-dropdown>
        </div>
        <div class="o-tools__bar__group o-tools__bar__group--cta">
          <a-button
            chameleon
            icon-name="check"
            size="2xl"
            @click.native="close()"
          />
        </div>
        <div class="o-tools__bar__group">
          <a-button
            chameleon
            icon-name="undo"
            size="lg"
            @click.native="undo()"
          />
          <a-button
            chameleon
            icon-name="delete"
            size="lg"
            @click.native="clean()"
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
      isVisible: false
    }
  },
  computed: {
    ...mapGetters({
      strokeColor: 'poster/getStrokeColor',
      strokeWidth: 'poster/getStrokeWidth'
    }),
    strokeWidthInput: {
      get() {
        return this.strokeWidth
      },
      set(val) {
        this.setStrokeWidth(val)
      }
    },
    strokeColorInput: {
      get() {
        return this.strokeColor
      },
      set(val) {
        console.log(val)
        this.setStrokeColor(val)
      }
    }
  },
  created() {
    this.$nuxt.$on('editor-open', () => {
      this.isVisible = true
    })
    this.$nuxt.$on('editor-close', () => {
      this.isVisible = false
    })
  },
  methods: {
    ...mapMutations({
      setStrokeWidth: 'poster/SET_STROKE_WIDTH',
      setStrokeColor: 'poster/SET_STROKE_COLOR'
    }),
    undo() {
      this.$nuxt.$emit('poster-undo')
    },
    clean() {
      this.$nuxt.$emit('poster-clean')
    },
    close() {
      this.$nuxt.$emit('poster-close')
    }
  }
}
</script>

<style>
.o-tools {
  position: fixed;
  z-index: var(--z-dialog);
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 0 var(--space-8);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.o-tools__bar {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}
.o-tools__bar__group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: 0 var(--space-4);
  border: 2px var(--color-gray-100) solid;
  height: var(--control-height-lg);
  border-radius: 99rem;
  color: var(--color-black);
  background: var(--color-white);
}
.o-tools__bar__group--cta {
  width: var(--control-height-2xl);
  height: var(--control-height-2xl);
  padding: 0;
}
.o-tools__strokeWidth {
  display: grid;
  grid-template-columns: 1fr 4ch;
  padding: var(--space-2) var(--space-4);
}
.o-tools__strokeWidth input {
  width: 10rem;
}
.o-tools__strokeWidth__value {
  text-align: right;
}
.o-tools button,
input {
  pointer-events: all;
}
.o-tools input[type='radio'] {
  display: none;
}
.o-tools input[type='radio'] + label {
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: var(--color);
  color: transparent;
  overflow: hidden;
  cursor: pointer;
}
.o-tools input[type='radio']:checked + label {
  outline: 2px var(--color) solid;
  outline-offset: 2px;
}
.o-tools__color {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4);
}
.c-toolbar-enter,
.c-toolbar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s 0.3s;
}
.c-toolbar-leave,
.c-toolbar-enter-to {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.3s 0.3s;
}
</style>
