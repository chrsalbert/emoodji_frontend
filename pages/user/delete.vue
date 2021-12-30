<template>
  <l-container width="xs">
    <m-title variant="page">
      <a-headline>Delete account</a-headline>
      <p>
        You are about to delete your account. This will include all your
        personal information, posters and smileys.
        <strong>This action can not be taken back.</strong>
      </p>
    </m-title>
    <e-group>
      <a-button :show-loader="form.loading" @click.native="confirmDeletion"
        >Delete my account</a-button
      >
      <a-button to="/user/profile" ghost>Cancel</a-button>
    </e-group>
  </l-container>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      form: {
        loading: false
      }
    }
  },
  methods: {
    showError(text) {
      this.$nuxt.$toast().show({
        variant: 'negative',
        text
      })
      this.form.loading = false
    },
    confirmDeletion() {
      if (
        !window.confirm('You are about to delete your account. Are you sure?')
      ) {
        return
      }
      this.deleteUser()
    },
    async deleteUser() {
      this.form.loading = true
      try {
        await this.$axios.post(`${process.env.backendUrl}/api/user/delete`, {
          token: this.$auth.strategy.token.get()
        })
        this.$nuxt.$toast().show({
          variant: 'positive',
          text: 'Account has been deleted'
        })
        await this.$auth.logout()
      } catch (e) {
        const error = e.response.data.message
        switch (error) {
          case 'user-not-exist':
            this.showError('Account is already deleted')
            await this.$auth.logout()
            break
          default:
            this.showError('Something went wrong. Please try again later.')
            break
        }
      }
    }
  }
}
</script>
