<template>
  <li ref="item">
    <div
      class="v-poster-calendar__day"
      :class="{ 'v-poster-calendar__day--open': state.editing }"
      :style="{
        '--open-x': `${editorPosition.offsetX}px`,
        '--open-y': `${editorPosition.offsetY}px`
      }"
      @click="openEditor()"
    >
      <v-poster-calendar-day-smiley :smiley="smiley" :active="state.editing" />
    </div>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: {
        editing: false
      },
      editorPosition: {
        offsetX: 0,
        offsetY: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      currentPosterId: 'poster/getCurrentPosterId',
      getSmiley: 'poster/getSmiley',
      getPolylines: 'poster/getPolylines'
    }),
    smiley() {
      return (
        this.getSmiley(this.date) || {
          date: this.date,
          polylines: []
        }
      )
    }
  },
  watch: {
    'state.editing'(newVal, oldVal) {
      if (newVal === true) {
        if (this.getSmiley(this.date) === undefined) {
          this.addSmiley()
        }
        this.$backdrop({
          backgroundColor: 'rgba(255,255,255,.6)',
          milkglass: true
        }).show()
        this.setPosterItemOpen(true)
        this.setEditorPosition()
        document.addEventListener('keyup', this.closeEditor)
      } else {
        this.onSubmit()
        this.$backdrop().hide()
        this.setPosterItemOpen(false)
        document.removeEventListener('keyup', this.closeEditor)
      }
    }
  },
  created() {
    this.$nuxt.$on('poster-close', () => {
      this.closeEditor()
    })
  },
  methods: {
    ...mapMutations({
      setPosterItemOpen: 'poster/SET_POSTER_ITEM_OPEN'
    }),
    openEditor() {
      this.$nuxt.$emit('editor-open')
      this.$nuxt.$emit('dialog-open')
      this.state.editing = true
    },
    closeEditor(event) {
      if (event && event.keyCode !== 27) {
        return
      }
      this.$nuxt.$emit('editor-close')
      this.$nuxt.$emit('dialog-close')
      this.state.editing = false
    },
    setEditorPosition() {
      const defaultOffset = this.$refs.item.getBoundingClientRect()
      this.editorPosition.offsetX = window.innerWidth / 2 - defaultOffset.left
      this.editorPosition.offsetY = window.innerHeight / 2 - defaultOffset.top
    },
    async addSmiley() {
      await this.$axios.post(
        `${process.env.backendUrl}/api/poster/${this.currentPosterId}/smiley`,
        {
          date: this.date,
          polylines: this.getPolylines(this.currentPosterId, this.date)
        }
      )
    },
    async onSubmit() {
      await this.$axios.patch(
        `${process.env.backendUrl}/api/poster/${this.currentPosterId}/smiley/${this.date}`,
        {
          polylines: this.smiley.polylines
        }
      )
      setTimeout(() => {
        this.$toast().show({
          text: 'Smiley saved',
          variant: 'positive'
        })
      }, 300)
    }
  }
}
</script>
<style>
.v-poster-calendar__day {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
}
.v-poster-calendar__day:hover:not(.v-poster-calendar__day--open) {
  transform: scale(1.1) rotate(3deg);
  transition: all 0.3s;
}
.v-poster-calendar__day--open {
  z-index: var(--z-dialog);
  transform: translate3d(
    calc(var(--open-x, 0%) - 50%),
    calc(var(--open-y, 0%) - 50%),
    0
  );
  height: min(90vw, calc(100vh - 20rem));
  width: min(90vw, calc(100vh - 20rem));
  transition: all 0.3s;
}
</style>
