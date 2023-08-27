interface Params {
  name: string
  value: string
  expires?: number
  path?: string
  domain?: string
  secure?: boolean
}

function setCookie({ name, value, expires, path, domain, secure }: Params) {
  let cookieString = `${encodeURI(name)}=${encodeURI(value)}`

  if (expires) {
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + expires)
    cookieString += `; expires=${expirationDate.toUTCString()}`
  }

  if (path) {
    cookieString += `; path=${path}`
  }

  if (domain) {
    cookieString += `; domain=${domain}`
  }

  if (secure) {
    cookieString += '; secure'
  }

  document.cookie = cookieString
}

export default setCookie
