export default {
  data() {
    return {
      fetch: {
        processing: false
      },
      form: {
        processing: false,
        sent: false
      }
    }
  },
  mounted() {
    if (this.$route.params.toast) {
      this.$toast().show({
        text: this.$route.params.toast.text,
        variant: this.$route.params.toast.variant
      })
    }
  },
  computed: {
    isFetchProcessing() {
      return this.fetch.processing
    },
    isFormProcessing() {
      return this.form.processing
    },
    isFormSent() {
      return this.form.sent
    }
  },
  methods: {
    setFetchProcessing(boolean) {
      this.fetch.processing = boolean
    },
    setFormProcessing(boolean) {
      this.form.processing = boolean
    },
    setFormSent(boolean) {
      this.setFormProcessing(false)
      this.form.sent = boolean
    },
    showFormError(response, messages, options) {
      this.$toast().show({
        text:
          messages[response] ||
          'An error has occurred. Please try again later.',
        variant: 'negative'
      })
      if (options.redirect) {
        this.$router.push({
          name: options.redirect
        })
      }
    },
    showFormSuccess(text, options) {
      this.$toast().show({
        text,
        variant: 'positive'
      })
      if (options.redirect) {
        this.$router.push({
          name: options.redirect
        })
      }
    }
  }
}
