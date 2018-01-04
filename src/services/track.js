import platziMusicService from './platzi-music'

const trackService = {}

trackService.search = function (q) {
  const type = 'track'

  return platziMusicService.get('/search', {
    params: { q, type }
  })
    .then(response => response.data)
}

trackService.getById = function (id) {
  return platziMusicService.get(`/tracks/${id}`)
    .then(response => response.data)
}

export default trackService
