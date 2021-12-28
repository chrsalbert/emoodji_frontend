export default (context, inject) => {
  const getRandomId = () => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      )
    }
    return result
  }

  inject('getRandomId', getRandomId)
}