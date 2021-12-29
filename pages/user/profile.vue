<template>
  <l-container width="2xs">
    <m-title variant="page">
      <a-headline>Profile</a-headline>
    </m-title>
    <m-form gap="var(--space-6)" @submit.native.prevent="onSubmit()">
      <m-control label="Forename" label-for="forename">
        <a-input id="forename" v-model="form.data.forename" label="Forename" />
      </m-control>
      <a-button submit size="sm">Save</a-button>
    </m-form>
  </l-container>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      form: {
        data: {
          forename: ''
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  beforeMount() {
    this.initFormData()
  },
  methods: {
    initFormData() {
      this.form.data = {
        forename: this.user.forename
      }
    },
    async onSubmit() {
      try {
        const { data } = await this.$axios.patch(
          `${process.env.backendUrl}/api/user/${this.user.id}`,
          {
            forename: this.form.data.forename
          }
        )
        this.$nuxt.$updatedUser(data)
        this.$toast().show({
          text: 'Profile saved',
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
    }
  }
}
</script>
