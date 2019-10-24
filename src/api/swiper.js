import fetch from './fetch.js'

export function getCarouselList () {
  return fetch({
    url: '/kukacms/getCarouselList.htm',
    method: 'get'
  })
}

export function setCarousel (id) {
  return fetch({
    url: `/kukacms/updateCarouselFlag.htm?id=${id}&isCarousel=1`,
    method: 'get'
  })
}

export function cancelCarousel (id) {
  return fetch({
    url: `/kukacms/updateCarouselFlag.htm?id=${id}&isCarousel=0`,
    method: 'get'
  })
}