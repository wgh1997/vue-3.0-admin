import axios from 'axios'
import store from '@/store/index.js'
import baseURL from './baseUrl'
console.log(baseURL, "basUrl2")
import {
    Message
} from 'element-ui'

const http = {}
//自己创建新的axios一个实例
var instance = axios.create({
    timeout: 5000, //如果超过5秒自动切断
    baseURL,
    //`validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
    // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve;
    // 否则，promise 将被 rejecte
    validateStatus (status) {
        //console.log(status,"状态码")
        switch (status) {
            case 400:
                Message.error('请求出错')
                break
            case 401:
                Message.warning({
                    message: '授权失败，请重新登录'
                })
                // store.commit('LOGIN_OUT')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 1000)
                return
            case 403:
                Message.warning({
                    message: '拒绝访问'
                })
                break
            case 404:
                Message.warning({
                    message: '请求错误,未找到该资源'
                })
                break
            case 500:
                Message.warning({
                    message: '服务端错误'
                })
                break
        }
        return status >= 200 && status < 300
    },
})

// 添加请求拦截器
// instance.interceptors.request.use(
//     function(config) {
//         //这里是请求前做什么
//         console.log(config,'我是请求之前做的')
//         // 请求头添加token
//         if (store.state.UserToken) {
//             config.headers.Authorization = `Bearer ${store.state.UserToken}`
//         }
//         return config
//     },
//     function(error) {
//         //这个是请求错误应该做什么
//         return Promise.reject(error)
//     }
// )

// 响应拦截器即异常处理

instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    },
    err => {
        // 对响应错误做点什么
        if (err && err.response) { } else {
            err.message = '连接服务器失败'
        }
        // Message.error({
        //     message: err.message
        // })
        return Promise.reject(err.response)
    }
)

http.get = function (url, options) {
    let loading

    if (!options || options.isShowLoading !== false) {

        //这是加载中
        // loading = document.getElementById('ajaxLoading')
        // loading.style.display = 'block'
    }
    return new Promise((resolve, reject) => {
        console.log(options, '这个应该是get传入的参数')
        instance
            .get(url, {
                params: options
            })
            .then(response => {
                if (!options || options.isShowLoading !== false) {
                    // loading = document.getElementById('ajaxLoading')
                    // loading.style.display = 'none'
                }
                console.log(typeof (response), 'get获取的数据')
                if (typeof (response) === "object") {
                    resolve(response)
                } else {
                    resolve(response)
                    // if (response === '添加成功') {
                    //   Message.success({
                    //     message: response,
                    //   })
                    // } else if (response === '更新成功') {
                    //   Message.success({
                    //     message: response,
                    //   })
                    // } else {
                    Message.success({
                        message: response,
                    })
                    //}

                }
            })
            .catch(e => {
                console.log(e)
            })
    })
}

http.post = function (url, data, options) {
    //登录 不成功加载中
    let loading
    if (!options || options.isShowLoading !== false) {
        // loading = document.getElementById('ajaxLoading')
        // console.log(loading)
        // loading.style.display = 'block'
    }

    return new Promise((resolve, reject) => {
        instance
            .post(url, data, options)
            .then(response => {
                if (!options || options.isShowLoading !== false) {
                    // loading = document.getElementById('ajaxLoading')
                    // loading.style.display = 'none'
                }
                console.log(response, "post获取的数据")

                //resolve(response)
                if (typeof (response) === "object") {
                    resolve(response)
                } else {
                    resolve(response)
                    // if (response === '添加成功') {
                    //   Message.success({
                    //     message: response,
                    //   })
                    // } else if (response === '更新成功') {
                    //   Message.success({
                    //     message: response,
                    //   })
                    // } else {
                    Message.success({
                        message: response,
                    })
                    //}

                }
            })
            .catch(e => {
                console.log(e)
            })
    })
}

export default http