export default (context, inject) => {
  const getRandomId = () => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const updatedUser = data => {
    context.$auth.refreshTokens()
    const updatedUser = { ...context.$auth.user }
    updatedUser.forename = data.forename
    context.$auth.setUser(updatedUser)
  }

  inject('getRandomId', getRandomId)
  inject('updatedUser', updatedUser)
}
