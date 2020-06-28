import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/authredirect'] // 不重定向白名单

router.beforeEach((to, from, next) => {
    // let a = 1
    // if (a = 1) { // 判断是否有token

    if (getToken()) { // 判断是否有token
        console.log(to)
        if (to.path === '/login') {
            next()
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息
                    // const roles = ['editor', 'develop'] // note: roles must be a array! such as: ['editor','develop']
                    console.log(res, '22222222')
                    const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
                    console.log('roles?', roles)
                    // 根据roles权限生成可访问的路由表
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        console.log('addrouters', store.getters.addRouters)
                        // 这里你要添加的时候必须是一个数组
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true
                    })
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error('验证失败,请重新登录')
                        next({ path: '/login' })
                    })
                })
            } else {
                console.log('====2')
                next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})
