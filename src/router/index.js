import Vue from 'vue'
import Router from 'vue-router'
// import HelloWord from '../components/HelloWord.vue'
// import Login from '../views/login/Login.vue'
Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/Readme',
        hidden: true,
        name: '首页',
        component: resolve => require(['../components/Sidebar_top.vue'], resolve),
        children: [
            {
                path: '/Readme',
                meta: { title: 'Readme', icon: 'el-icon-menu' },
                component: resolve => require(['../views/Home/index.vue'], resolve)
            }
        ]
    },
    {
        path: '/login',
        name: '登录页面',
        hidden: true,
        component: resolve => require(['../views/login/Login.vue'], resolve)
    },
    {
        path: '/Readme',
        index: 'Readme',
        name: '首页',
        meta: {
            title: '首页',
            icon: 'el-icon-menu'
        },
        component: resolve => require(['../components/Sidebar_top.vue'], resolve)
    }
]

export default new Router({
    mode: 'hash',
    routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {
        path: '/one',
        name: '我是主',
        meta: {
            title: '我是主',
            icon: 'el-icon-setting',
            roles: ['admin']
        },
        component: resolve => require(['../components/Sidebar_top.vue'], resolve),
        children: [
            {
                name: '我是一',
                path: '/permission',
                meta: {
                    title: '我是子', icon: 'el-icon-menu', roles: ['admin']
                },
                component: resolve => require(['../components/HelloWord.vue'], resolve)
            },
            {
                name: '我是二',
                path: '/permission1',
                meta: {
                    title: '我是二', icon: 'el-icon-menu', roles: ['editor']
                },
                component: resolve => require(['../views/Home/index.vue'], resolve)
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]
