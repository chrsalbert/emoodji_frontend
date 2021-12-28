<template>
  <div>
    <l-container width="xs">
      <m-title center>
        <a-headline>Create a poster</a-headline>
        <p>
          Your poster will contain all of your smileys over a certain period of
          time.
        </p>
      </m-title>
      <m-form gap="var(--space-4)" @submit.native.prevent="onSubmit()">
        <m-control label="Title" label-for="title">
          <a-input
            id="title"
            v-model="form.data.title"
            placeholder="My days"
            size="lg"
          />
        </m-control>
        <m-form-row>
          <m-control label="Start date" label-for="startDate">
            <a-input
              id="startDate"
              v-model="form.data.startDate"
              type="date"
              size="lg"
            />
          </m-control>
          <m-control label="End date" label-for="endDate">
            <a-input
              id="endDate"
              v-model="form.data.endDate"
              type="date"
              size="lg"
            />
          </m-control>
        </m-form-row>
        <template #actions>
          <a-button full submit>Create</a-button>
        </template>
      </m-form>
    </l-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        data: {
          title: '',
          startDate: '2021-11-30',
          endDate: '2021-12-12'
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    posterData() {
      return {
        userId: this.user.id,
        startDate: this.form.data.startDate,
        endDate: this.form.data.endDate,
        title: this.form.data.title
      }
    }
  },
  methods: {
    ...mapActions({
      addPoster: 'poster/addPoster'
    }),
    async onSubmit() {
      try {
        const { data } = await this.$axios.post(
          `${process.env.backendUrl}/api/poster`,
          {
            ...this.form.data,
            title: this.form.data.title || 'My days',
            userId: this.user.id
          }
        )
        await this.addPoster(data)
      } catch (error) {
        if (error.response) {
          this.form.notice = {
            show: true,
            text: 'An error has occurred. Please try again later.'
          }
        }
      }
    }
  }
}
</script>
