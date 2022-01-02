<template>
  <o-loading />
</template>
<script>
import form from '~/mixins/form.js'
export default {
  mixins: [form],
  layout: 'blank',
  async fetch() {
    await this.activateEmail(this.$route.query.token)
  },
  fetchOnServer: false,
  methods: {
    async activateEmail(token) {
      try {
        const { data } = await this.$axios.get(
          `${process.env.backendUrl}/api/user/activate-email`,
          {
            headers: {
              authorization: token
            }
          }
        )
        this.$nuxt.$updatedUser(data)
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
