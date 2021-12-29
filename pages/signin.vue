<template>
  <o-gate>
    <template #figure>
      <a-smiley :mouth-state="smiley.mouthState" />
    </template>
    <template #content>
      <l-container width="2xs">
        <m-title>
          <a-headline>Welcome back</a-headline>
          <p>Draw your mood of today.</p>
        </m-title>
        <m-form gap="var(--space-6)" @submit.native.prevent="onSubmit()">
          <m-control label="Email address" label-for="email" float-label>
            <a-input
              id="email"
              v-model="form.data.email"
              slot-scope="{ onInput, onFocus, onBlur }"
              size="lg"
              type="email"
              required
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
            />
          </m-control>
          <m-control label="Password" label-for="password" float-label>
            <a-input
              id="password"
              v-model="form.data.password"
              slot-scope="{ onInput, onFocus, onBlur }"
              size="lg"
              type="password"
              required
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur"
            />
          </m-control>
          <a-button :loading="form.processing" submit full>Log in</a-button>
        </m-form>
        <br /><br />
        <p>
          No account yet?
          <nuxt-link to="/signup">Sign up</nuxt-link>
        </p>
      </l-container>
    </template>
  </o-gate>
</template>
<script>
export default {
  layout: 'blank',
  data() {
    return {
      smiley: {
        mouthState: 'default'
      },
      form: {
        data: {
          email: '',
          password: ''
        }
      }
    }
  },
  mounted() {
    if (this.$route.params.success) {
      this.$toast().show({
        text: this.$route.params.success,
        variant: 'positive'
      })
    }
    if (this.$route.params.error) {
      this.$toast().show({
        text: this.$route.params.error,
        variant: 'negative'
      })
    }
  },
  methods: {
    async onSubmit() {
      this.form.processing = true
      try {
        await this.$auth.login({
          data: this.form.data
        })
        this.form.processing = false
      } catch (error) {
        if (error.response) {
          let text = ''
          switch (error.response.data.error) {
            case 'password-does-not-match':
              text = 'The email address and password do not match.'
              break
            case 'user-not-exist':
              text = 'No account could be found under this email address.'
              break
            default:
              text = 'An error has occurred. Please try again later.'
          }
          this.$toast().show({
            text,
            variant: 'negative'
          })
          this.form.processing = false
        }
      }
    }
  }
}
</script>
