const simplifyStrings = (strings) => strings.map((str) => str.toLowerCase().trim())

module.exports.filterMovies = (movies, keyWord, shortFilmsToggle, shortFilmDuration = 40) => {
  return movies.filter((item) => {
    const [name, key] = simplifyStrings([item.nameRU, keyWord])
    return name.includes(key) && (shortFilmsToggle || item.duration > shortFilmDuration)
  })
}
