<template>
  <div>
    <o-loading v-if="$fetchState.pending || isFetchProcessing" fullsize />
    <l-container v-else width="xs">
      <m-title variant="page">
        <a-headline>Set new password</a-headline>
      </m-title>
      <m-form gap="var(--space-4)" @submit.native.prevent="onSubmit()">
        <m-control label="New password" label-for="password">
          <a-input
            id="password"
            v-model="form.data.password"
            size="lg"
            type="password"
            required
          />
        </m-control>
        <template #actions>
          <a-button full submit :show-loader="isFormProcessing"
            >Set password</a-button
          >
        </template>
      </m-form>
    </l-container>
  </div>
</template>
<script>
import form from '~/mixins/form.js'
export default {
  mixins: [form],
  data() {
    return {
      data: null,
      form: {
        data: {
          password: ''
        }
      }
    }
  },
  async fetch() {
    await this.verifyToken(this.$route.query.token)
  },
  fetchOnServer: false,
  methods: {
    async verifyToken(token) {
      this.setFetchProcessing(true)
      try {
        const { data } = await this.$axios.get(
          `${process.env.backendUrl}/api/auth/verify`,
          {
            headers: {
              authorization: token
            }
          }
        )
        this.data = data
        this.setFetchProcessing(false)
      } catch (error) {
        this.showFormError(
          error.response?.data.message,
          {
            unauthorized:
              'The recovery link is invalid. Enter your email address again to get a new recovery link.'
          },
          {
            redirect: 'login-reset-password'
          }
        )
      }
    },
    async onSubmit() {
      try {
        await this.$axios.patch(
          `${process.env.backendUrl}/api/user/${this.data.userId}`,
          {
            password: this.form.data.password
          }
        )
        this.showFormSuccess(
          'Your password has been changed. You can login now.',
          {
            redirect: 'login'
          }
        )
      } catch (error) {
        console.log(error)
        this.showFormError(
          error.response?.data.message,
          {
            'token-expired':
              'Your password reset link is expired. Please request a new one.'
          },
          {
            redirect: 'login-reset-password'
          }
        )
      }
    }
  }
}
</script>
<style></style>
