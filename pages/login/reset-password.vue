<template>
  <l-container width="xs">
    <template v-if="isFormSent">
      <m-title variant="page">
        <a-headline>Check your mail</a-headline>
        <p>
          You have received an email with instructions on how to reset your
          password.
        </p>
      </m-title>
      <p style="font-size:var(--font-sm);">
        Did not receive the email? Check your spam filter or
        <nuxt-link to="/login/set-password"
          ><b>try another email address</b></nuxt-link
        >.
      </p>
    </template>
    <template v-else>
      <m-title variant="page">
        <a-headline>Reset password</a-headline>
        <p>
          Enter the email address associated with your account for instructions
          on resetting your password.
        </p>
      </m-title>
      <m-form @submit.native.prevent="onSubmit()">
        <m-control label="Email address" label-for="email">
          <a-input
            id="email"
            v-model="form.data.email"
            size="lg"
            type="email"
            required
          />
        </m-control>
        <template #actions>
          <a-button full submit :show-loader="isFormProcessing"
            >Get instructions</a-button
          >
        </template>
      </m-form>
    </template>
  </l-container>
</template>
<script>
import form from '~/mixins/form.js'
export default {
  mixins: [form],
  data() {
    return {
      form: {
        data: {
          email: ''
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      this.setFormProcessing(true)
      try {
        await this.$axios.post(
          `${process.env.backendUrl}/api/user/send-password-instructions`,
          {
            email: this.form.data.email
          }
        )
        this.setFormSent(true)
      } catch (error) {
        this.showFormError(error.response?.data.message, {
          'missing-email': 'Please insert your email address'
        })
        this.setFormProcessing(false)
      }
    }
  }
}
</script>
<style></style>
