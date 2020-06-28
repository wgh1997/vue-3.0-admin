import request from '@/utils/request'
import axios from '@/config/httpConfig'
export function getUser (data) {
    return axios.post('/login', data)
}
export function login (username, password) {
    console.log(username, password)
    return request({
        url: 'http://127.0.0.1:8002/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo (token) {
    return request({
        url: 'http://127.0.0.1:8002/info',
        method: 'get',
        params: { token }
    })
}

export function logout () {
    return request({
        url: 'https://easy-mock.com/mock/5a72c1ecc76727050336e0bc/mdm/user/logout',
        method: 'post'
    })
}
