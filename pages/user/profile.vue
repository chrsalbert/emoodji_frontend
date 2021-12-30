<template>
  <l-container width="xs">
    <m-title variant="page">
      <a-headline>Profile</a-headline>
    </m-title>
    <ul class="v-profile__data">
      <li>
        <v-user-profile-form
          id="forename"
          label="Forename"
          success-message="Forename saved"
          :value="form.data.forename"
        />
      </li>
      <li>
        <v-user-profile-form
          id="email"
          label="Email address"
          success-message="You got an email with an activation link"
          :value="form.data.email"
          :input-options="{ type: 'email' }"
        />
      </li>
    </ul>
    <div class="v-profile__delete">
      <a-button to="/user/delete" size="sm" ghost variant="light" link
        >Delete account</a-button
      >
    </div>
  </l-container>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      form: {
        data: {
          forename: '',
          email: ''
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
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
  beforeMount() {
    this.initFormData()
  },
  methods: {
    initFormData() {
      this.form.data = this.user
    }
  }
}
</script>
<style>
.v-profile__data {
  margin: calc(var(--space-4) * -1) 0;
}
.v-profile__data > li {
  padding: var(--space-4) 0;
  border-bottom: 1px var(--color-gray-100) solid;
}

.v-profile__delete {
  margin: var(--space-12) 0;
  text-align: right;
}
@media screen and (min-width: 480px) {
}
</style>
