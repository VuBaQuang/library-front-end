import Cookies from 'js-cookie'

const TokenKey = 'Kma-Token'
const AuthKey = 'Kma-Auth'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { sameSite: 'strict' })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuth() {
  return Cookies.get(AuthKey)
}

export function setAuth(token) {
  return Cookies.get(AuthKey, token, { sameSite: 'strict' })
}

export function removeAuth() {
  return Cookies.remove(AuthKey)
}
