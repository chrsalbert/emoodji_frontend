<template>
  <o-loading />
</template>
<script>
export default {
  layout: 'blank',
  async fetch() {
    await this.activateEmail(this.$route.params.token)
  },
  fetchOnServer: false,
  methods: {
    async activateEmail(token) {
      try {
        await this.$axios.post(
          `${process.env.backendUrl}/api/user/profile/email/activate`,
          {
            token
          }
        )
        this.$router.push({
          name: 'user-profile',
          params: {
            toast: {
              text: 'Your new email address has been activated',
              variant: 'positive'
            }
          }
        })
      } catch (e) {
        let text = e.response.data.message
        let variant = 'default'
        switch (text) {
          case 'already-activated':
            text = 'Account is already activated'
            break
          case 'token-expired':
            text =
              'Activation link is expired. Please edit your email address again.'
            variant = 'negative'
            break
          default:
            text = 'Invalid acivation link'
            variant = 'negative'
            break
        }
        this.$router.push({
          name: 'user-profile',
          params: {
            toast: {
              text,
              variant
            }
          }
        })
      }
    }
  }
}
</script>
