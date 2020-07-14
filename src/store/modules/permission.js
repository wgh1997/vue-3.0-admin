import { asyncRouterMap, constantRouterMap } from '@/router'// 这个是引入的路由器

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// 这使用editor的时候才会触发这个函数
function hasPermission (roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// 这使用editor的时候才会触发这个函数这个函数输出的是404
function filterAsyncRouter (asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers// 这个是没有获取动态路由的
            state.routers = constantRouterMap.concat(routers)// 数组的合并
            localStorage.routers=JSON.stringify(constantRouterMap.concat(routers))
            state.routers = JSON.parse(localStorage.routers)
        }
    },
    actions: {
        GenerateRoutes ({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters
                if (roles.indexOf('admin') >= 0) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
