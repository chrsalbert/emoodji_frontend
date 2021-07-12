export const state = () => ({
  backdropOpen: false
})

export const getters = {
  backdropOpen: (state) => {
    return state.backdropOpen
  }
}

export const mutations = {
  SET_BACKDROP_OPEN(state, boolean) {
    state.backdropOpen = boolean
  }
}
