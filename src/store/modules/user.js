import { login, logout, getInfo } from '../../api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(), // 存储到cookei
        name: '', // 名字
        avatar: '', // 头像
        roles: []// 角色
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login ({ commit }, userInfo) {
            const username = userInfo.username.trim()// 他这是去除二端的空白的字符的
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    console.log(response, '好像我没有运行')
                    const data = response.data.data
                    console.log(data)
                    // 这个是把token存储到cookie
                    setToken(data.token)
                    commit('SET_TOKEN', data.token)
                    // 成功
                    resolve()
                }).catch(error => {
                    // 失败
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo ({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)// 角色
                    commit('SET_NAME', data.name)// 名字
                    commit('SET_AVATAR', data.avatar)// 头像
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut ({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    console.log('我运行了吗')
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                    //  localStorage.routers='';
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut ({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
