export const state = () => ({
  strokeColor: '#000000',
  strokeWidth: 60,
  posterItemOpen: false
})

export const getters = {
  getStrokeWidth: state => {
    return state.strokeWidth
  },
  getStrokeColor: state => {
    return state.strokeColor
  },
  getPosterItemOpen: (state) => {
    return state.posterItemOpen
  }
}

export const mutations = {
  SET_STROKE_COLOR(state, string) {
    state.strokeColor = string
  },
  SET_STROKE_WIDTH(state, number) {
    state.strokeWidth = number
  },
  SET_POSTER_ITEM_OPEN(state, boolean) {
    state.posterItemOpen = boolean
  }
}
