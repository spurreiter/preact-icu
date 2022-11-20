/**
 * parses a cookie string
 * @param {string} cookieStr
 * @returns {{[cookieName: string]: string}|{}}
 */
export function cookieParse (cookieStr = '') {
  const parts = cookieStr.split(/\s*;\s*/)
  const cookies = {}
  for (const part of parts) {
    const [key, val] = part.split('=')
    if (key) {
      const value = decodeURIComponent(val)
      cookies[key] = value
    }
  }
  return cookies
}

const isDate = d => !isNaN(new Date(d).getTime())

export function cookieSerialize (name, value, options) {
  const { domain, path, expires, sameSite = 'Lax' } = options || {}
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`]
  if (isDate(expires)) {
    parts.push(`Expires=${new Date(expires).toUTCString()}`)
  }
  if (path) {
    parts.push(`Path=${path}`)
  }
  if (domain) {
    parts.push(`Domain=${domain}`)
  }
  if (sameSite) {
    parts.push(`SameSite=${sameSite}`)
  }
  return parts.join('; ')
}
