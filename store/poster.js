export const state = () => ({
  isFetched: false,
  posters: [],
  currentPosterId: null,
  strokeColor: '#000000',
  strokeWidth: 60,
  posterItemOpen: false
})

export const getters = {
  hasPosters: state => {
    return state.posters.length > 0 || false
  },
  getStrokeWidth: state => {
    return state.strokeWidth
  },
  getStrokeColor: state => {
    return state.strokeColor
  },
  getPosterItemOpen: state => {
    return state.posterItemOpen
  },
  getPosters: state => {
    return state.posters
  },
  getPosterById: state => posterId => {
    return state.posters.find(poster => poster._id === posterId)
  },
  getPosterIndexByPosterId: state => posterId => {
    return state.posters.findIndex(poster => poster._id === posterId)
  },
  getSmileys: (state, getters) => posterId => {
    const poster = getters.getPosterById(posterId)
    return poster.smileys
  },
  getSmiley: (state, getters) => date => {
    if (!getters.getCurrentPoster.smileys) {
      return undefined
    }
    return getters.getCurrentPoster.smileys.find(smiley => smiley.date === date)
  },
  getCurrentPoster: state => {
    return state.posters.find(poster => poster._id === state.currentPosterId)
  },
  getCurrentPosterId: state => {
    return state.currentPosterId
  },
  getCurrentPosterIndex: state => {
    return state.posters.findIndex(
      poster => poster._id === state.currentPosterId
    )
  },
  getPolylines: (state, getters) => (posterId, date) => {
    const smiley = getters.getSmiley(posterId, date)
    if (smiley && smiley.polylines) {
      return smiley.polylines
    }
    return []
  },
  getSmileyIndexByDate: (state, getters) => date => {
    return getters.getCurrentPoster.smileys.findIndex(
      smiley => smiley.date === date
    )
  },
  getCurrentPosterCalendarDays: (state, getters) => {
    const calendar = []
    const startDate = getters.getCurrentPoster.startDate
    const endDate = getters.getCurrentPoster.endDate

    for (
      let d = new Date(startDate);
      d <= new Date(endDate);
      d.setDate(d.getDate() + 1)
    ) {
      calendar.push(new Date(d).toISOString().slice(0, 10))
    }

    // if(getters.getCurrentPoster.smileys) {
    //   for (const [key, value] of Object.entries(
    //     getters.getCurrentPoster.smileys
    //   )) {
    //     calendar[key] = value
    //   }
    // }

    return calendar
  }
}

export const mutations = {
  SET_IS_FETCHED(state, boolean) {
    state.isFetched = boolean
  },
  SET_STROKE_COLOR(state, string) {
    state.strokeColor = string
  },
  SET_STROKE_WIDTH(state, number) {
    state.strokeWidth = number
  },
  SET_POSTER_ITEM_OPEN(state, boolean) {
    state.posterItemOpen = boolean
  },
  SET_POSTERS(state, array) {
    state.posters = array
  },
  SET_POLYLINES(state, { posterIndex, smileyIndex }) {
    state.posters[posterIndex].smileys[smileyIndex].polylines = []
  },
  SET_CURRENT_POSTER_ID(state, string) {
    state.currentPosterId = string
  },
  ADD_POSTER(state, poster) {
    state.posters.push(poster)
  },
  ADD_SMILEY(state, { posterIndex, smiley }) {
    const poster = state.posters[posterIndex]
    if (!poster.smileys) {
      poster.smileys = []
    }
    poster.smileys.push(smiley)
  },
  SET_SMILEYS(state, { posterIndex, smileys }) {
    this._vm.$set(state.posters[posterIndex], 'smileys', smileys)
  },
  ADD_POLYLINE(state, { posterIndex, date, polyline }) {
    const smiley = state.posters[posterIndex].smileys.find(
      smiley => smiley.date === date
    )
    smiley.polylines.push(polyline)
  },
  ADD_POINTS(state, { posterIndex, smileyIndex, coords }) {
    const polylines = state.posters[posterIndex].smileys[smileyIndex].polylines
    const polyline = polylines[polylines.length - 1]
    polyline.points +=
      polyline.points === ''
        ? `${coords.x} ${coords.y}`
        : `,${coords.x} ${coords.y}`
  },
  DELETE_LAST_POLYLINE(state, { posterIndex, smileyIndex }) {
    state.posters[posterIndex].smileys[smileyIndex].polylines.pop()
  }
}

export const actions = {
  addPoster({ state, commit }, poster) {
    commit('ADD_POSTER', poster)
    commit('SET_CURRENT_POSTER_ID', state.posters[0]._id)
  },
  async fetchPostersByUserId({ commit, getters, dispatch }, userId) {
    const response = await this.$axios.get(
      `${process.env.backendUrl}/api/posters/user/${userId}`
    )
    const posters = response.data
    commit('SET_POSTERS', posters)

    if (getters.hasPosters) {
      commit('SET_CURRENT_POSTER_ID', posters[0]._id)
    }

    commit('SET_IS_FETCHED', true)
    return posters
  },
  async getPoster(posterId) {
    const response = await this.$axios.get(
      `${process.env.backendUrl}/api/posters/${posterId}`
    )
    return response.data
  },
  async getPosterSmileys({ commit, getters }, posterId) {
    const response = await this.$axios.get(
      `${process.env.backendUrl}/api/posters/${posterId}/smileys`
    )
    const smileys = response.data
    const posterIndex = getters.getPosterIndexByPosterId(posterId)
    commit('SET_SMILEYS', { posterIndex, smileys })
    return smileys
  },
  async setSmiley({ commit }, { posterId, date, polylines }) {
    try {
      await this.$axios.patch(
        `${process.env.backendUrl}/api/poster/entry/${this.currentPosterId}`,
        {
          date: this.date,
          polylines: this.getPolylines(this.currentPosterId, this.date)
        }
      )
    } catch (error) {
      if (error.response) {
        console.error('ERROR POSTER')
      }
    }
  },
  deleteLastPolyline({ commit, getters }, date) {
    const posterIndex = getters.getCurrentPosterIndex
    const smileyIndex = getters.getSmileyIndexByDate(date)
    commit('DELETE_LAST_POLYLINE', { posterIndex, smileyIndex })
  },
  deleteAllPolylines({ commit, getters }, date) {
    const posterIndex = getters.getCurrentPosterIndex
    const smileyIndex = getters.getSmileyIndexByDate(date)
    commit('SET_POLYLINES', { posterIndex, smileyIndex })
  },
  addPosters({ commit }, posters) {
    commit('SET_POSTERS', posters)
    commit('SET_CURRENT_POSTER_ID', posters[0]._id)
  },
  addSmiley({ commit, getters }, smiley) {
    const posterIndex = getters.getCurrentPosterIndex
    commit('ADD_SMILEY', { posterIndex, smiley })
  },
  setSmileys({ commit, getters }, smileys) {
    const posterIndex = getters.getCurrentPosterIndex
    commit('SET_SMILEYS', { posterIndex, smileys })
  },
  addPolyline({ commit, state, getters, dispatch }, { date, polyline }) {
    const posterIndex = getters.getCurrentPosterIndex
    if (!state.posters[posterIndex].smileys) {
      dispatch('setSmileys', [])
    }
    if (
      !state.posters[posterIndex].smileys.find(smiley => smiley.date === date)
    ) {
      dispatch('addSmiley', {
        date,
        polylines: []
      })
    }
    return commit('ADD_POLYLINE', { posterIndex, date, polyline })
  },
  addPoints({ commit, state, getters }, { date, coords }) {
    const posterIndex = getters.getCurrentPosterIndex
    const smileyIndex = getters.getSmileyIndexByDate(date)
    commit('ADD_POINTS', { posterIndex, smileyIndex, coords })
  }
}
