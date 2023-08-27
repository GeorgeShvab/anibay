function getCookie(name: string) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return decodeURI(match[2])
}

export default getCookie
