<template>
  <o-loading />
</template>
<script>
export default {
  layout: 'blank',
  async fetch() {
    await this.activateUser(this.$route.params.token)
  },
  fetchOnServer: false,
  methods: {
    async activateUser(token) {
      try {
        await this.$axios.post(`${process.env.backendUrl}/api/user/activate`, {
          token
        })
        this.$router.push({
          name: 'login',
          params: {
            success: 'Your account has been activated'
          }
        })
      } catch (e) {
        let error = e.response.data.message
        switch (error) {
          case 'already-activated':
            error = 'Account is already activated'
            break
          default:
            error = 'Invalid acivation link'
            break
        }
        this.$router.push({
          name: 'login',
          params: {
            error
          }
        })
      }
    }
  }
}
</script>
