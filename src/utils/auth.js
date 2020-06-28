import Cookies from 'js-cookie'

const TokenKey = 'token'
// 从cookie中取出
export function getToken () {
    return Cookies.get(TokenKey)
}
// 存储到cokie
export function setToken (token) {

    return Cookies.set(TokenKey, token)

}

export function removeToken () {
    return Cookies.remove(TokenKey)
}
