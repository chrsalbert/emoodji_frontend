<template>
  <m-form gap="0" @submit.native.prevent="onSubmit()">
    <div class="v-profile__formRow">
      <div>
        <m-control :label="label" :label-for="id">
          <transition name="v-profile__formRow__field-" mode="out-in">
            <a-input
              v-if="isOpen"
              :id="id"
              key="input"
              v-model="form.value"
              :label="label"
              size="sm"
              required
              v-bind="inputOptions"
            />
            <p v-else key="text" class="v-profile__formRow__value">
              {{ form.value }}
            </p>
          </transition>
        </m-control>
        <transition name="v-profile__formRow__cta-" mode="out-in">
          <a-button
            v-if="isOpen"
            key="open"
            size="sm"
            icon-name="check"
            submit
          />
          <a-button
            v-else
            key="submit"
            size="sm"
            ghost
            variant="light"
            icon-name="pen"
            @click.native.prevent="toggleFormOpen"
          />
        </transition>
      </div>
      <transition name="v-profile__formRow__hint-" mode="out-in">
        <p v-if="showEmailHint" class="v-profile__formRow__hint">
          Please click the activation link that you received to
          {{ value }} in order to activate your new email address.
        </p>
      </transition>
    </div>
  </m-form>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    inputOptions: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      required: true
    },
    successMessage: {
      type: String,
      default: 'Profile saved'
    }
  },
  data() {
    return {
      isOpen: false,
      showEmailHint: false,
      form: {
        value: null
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    hasValueChanged() {
      return this.form.value !== this.user[this.id]
    }
  },
  mounted() {
    this.form.value = this.value
  },
  methods: {
    async onSubmit() {
      if (!this.hasValueChanged) {
        return this.toggleFormOpen()
      }
      try {
        const { data } = await this.$axios.patch(
          `${process.env.backendUrl}/api/user/${this.user.id}`,
          {
            [this.id]: this.form.value
          }
        )
        this.$nuxt.$updatedUser(data)
        this.toggleFormOpen()
        if (this.id === 'email') {
          this.showEmailHint = true
          this.form.value = this.value
        }
        this.$toast().show({
          text: this.successMessage,
          variant: 'positive'
        })
      } catch (error) {
        if (error.response) {
          this.$toast().show({
            text: 'An error has occurred. Please try again later.',
            variant: 'negative'
          })
        }
      }
    },
    toggleFormOpen() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style>
.v-profile__formRow > div {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: flex-end;
  grid-gap: var(--space-2);
}
.v-profile__formRow__value {
  display: flex;
  align-items: center;
  min-height: var(--control-sm);
}
.v-profile__formRow__hint {
  font-size: var(--font-sm);
  color: var(--color-gray-500);
  margin-right: var(--control-md);
}

.v-profile__formRow__cta--enter-active,
.v-profile__formRow__cta--leave-active {
  transition: all 0.15s ease-out;
}
.v-profile__formRow__field--enter-active,
.v-profile__formRow__field--leave-active {
  transition: all 0.15s ease-out 0.075s;
}
.v-profile__formRow__hint--enter-active,
.v-profile__formRow__hint--leave-active {
  transition: all 0.15s ease-out 0.3s;
}
.v-profile__formRow__field--leave-to,
.v-profile__formRow__cta--leave-to {
  transform: translateX(-0.5rem);
  opacity: 0;
}
.v-profile__formRow__field--enter,
.v-profile__formRow__cta--enter,
.v-profile__formRow__hint--enter {
  transform: translateX(0.5rem);
  opacity: 0;
}
</style>
