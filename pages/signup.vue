<template>
  <o-gate>
    <template #figure>
      <a-smiley :mood="smiley.mood" />
    </template>
    <template #content>
      <l-container width="2xs">
        <transition name="l-gate-transition-title" mode="out-in">
          <m-title v-if="form.sent" key="success">
            <a-headline>You got mail</a-headline>
            <p>
              Please click the activation link that you received with your
              welcome mail.
            </p>
            <a-button
              v-if="emailProvider"
              :href="emailProvider.url"
              size="md"
              icon="circle-out"
              icon-right
              wide
              >Visit {{ emailProvider.name }}</a-button
            >
          </m-title>
          <m-title v-else key="default">
            <a-headline>Sign up</a-headline>
            <p>Start tracking your mood today.</p>
          </m-title>
        </transition>
        <transition name="l-gate-transition-form" mode="out-in">
          <m-form
            v-if="!form.sent"
            gap="var(--space-6)"
            @submit.native.prevent="onSubmit()"
          >
            <m-control label="Forename" label-for="forename" float-label>
              <a-input
                id="forename"
                v-model="form.data.forename"
                slot-scope="{ onInput, onFocus, onBlur }"
                size="lg"
                required
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
              />
            </m-control>
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
                min-length="6"
                @input="onInput"
                @focus="
                  onFocus()
                  smiley.mood = 'invisible'
                "
                @blur="onBlur"
                @mouseover.native="smiley.mood = 'invisible'"
                @mouseleave.native="smiley.mood = ''"
              />
            </m-control>
            <a-button
              submit
              full
              :loading="form.processing"
              @mouseenter.native="smiley.mood = 'happy'"
              @mouseleave.native="smiley.mood = ''"
              >Sign up</a-button
            >
            <br /><br />
            <p>
              Already have an account?
              <nuxt-link to="/signin">Sign in</nuxt-link>
            </p>
          </m-form>
        </transition>
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
        mood: 'default'
      },
      form: {
        processing: false,
        sent: false,
        data: {
          forename: '',
          email: '',
          password: ''
        }
      },
      providers: [
        {
          name: 'Google Mail',
          tld: 'googlemail.com',
          url: 'https://mail.google.com/mail/'
        },
        {
          name: 'Google Mail',
          tld: 'gmail.com',
          url: 'https://mail.google.com/mail/'
        },
        {
          name: 'Web.de',
          tld: 'web.de',
          url: 'https://web.de'
        }
      ]
    }
  },
  computed: {
    emailProvider() {
      const tld = this.form.data.email.split('@')[1]
      return this.providers.find(provider => provider.tld === tld) || null
    }
  },
  methods: {
    async onSubmit() {
      this.form.processing = true
      try {
        await this.$axios.post(`${process.env.backendUrl}/api/user`, {
          email: this.form.data.email,
          password: this.form.data.password,
          forename: this.form.data.forename
        })
        this.smiley.mood = 'happy'
        this.form.sent = true
        this.form.processing = false
      } catch (error) {
        if (error.response) {
          this.smiley.mood = 'sad'
          let text = ''
          switch (error.response.data.error) {
            case 'email-already-exists':
              text = 'This email address is already signed up.'
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
<style>
.l-gate-transition-form-enter-active,
.l-gate-transition-form-leave-active {
  transition: all 0.3s ease-in;
  opacity: 0;
}
.l-gate-transition-form-enter,
.l-gate-transition-form-leave-to {
  transform: translateY(4rem);
}

.l-gate-transition-title-enter-active,
.l-gate-transition-title-leave-active {
  transition: all 0.3s ease-in-out;
}
.l-gate-transition-title-enter,
.l-gate-transition-title-leave-to {
  transform: translateY(-4rem);
  opacity: 0;
}
</style>
