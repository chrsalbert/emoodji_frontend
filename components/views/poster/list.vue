<template>
  <div>
    <m-title variant="page">
      <a-headline>{{ poster.title }}</a-headline>
      <p>
        {{ toLocalDateString(poster.startDate) }}
        –
        {{ toLocalDateString(poster.endDate) }}
      </p>
    </m-title>
    <v-poster-calendar />
    <v-poster-tools />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      poster: 'poster/getCurrentPoster'
    })
  },
  methods: {
    toLocalDateString(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
