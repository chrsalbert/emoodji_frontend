<template>
  <ul class="v-poster-calendar">
    <v-poster-calendar-day
      v-for="date in currentPosterCalendarDays"
      :key="date"
      :date="date"
    />
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentPosterCalendarDays: 'poster/getCurrentPosterCalendarDays'
    })
  },
  methods: {
    // getMonthName(month) {
    //   const date = new Date(2021, month, 1)
    //   return date.toLocaleString('default', { month: 'long' })
    // }
  }
}
</script>
<style>
.v-poster-calendar {
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: var(--space-2);
}
.v-poster-calendar > li {
  position: relative;
  list-style: none;
  padding-top: 100%;
}
@media screen and (min-width: 600px) {
  .v-poster-calendar {
    grid-gap: var(--space-4);
  }
}
</style>
