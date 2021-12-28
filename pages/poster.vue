<template>
  <l-container>
    <o-loading v-if="$fetchState.loading">Loading…</o-loading>
    <v-poster-list v-else-if="hasPosters" />
    <v-poster-add v-else />
  </l-container>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  middleware: 'auth',
  async fetch() {
    if (!this.isFetched) {
      await this.fetchPostersByUserId(this.user.id)
    }
  },
  computed: {
    ...mapState('poster', ['isFetched']),
    ...mapGetters({
      hasPosters: 'poster/hasPosters'
    }),
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    ...mapActions({
      fetchPostersByUserId: 'poster/fetchPostersByUserId'
    })
  }
}
</script>
