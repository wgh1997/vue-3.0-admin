import Vue from 'vue'
import Router from 'vue-router'
// import HelloWord from '../components/HelloWord.vue'
// import Login from '../views/login/Login.vue'
Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/home',
        hidden: true,
        name: '首页',
        component: resolve => require(['../components/Sidebar_top.vue'], resolve),
        children: [
            {
                path: '/home',
                meta: { title: 'Home', icon: 'el-icon-menu' },
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
        name: '我是admin',
        meta: {
            title: '我是admin',
            icon: 'el-icon-setting',
            roles: ['admin']
        },
        component: resolve => require(['../components/Sidebar_top.vue'], resolve),
        children: [
            {
                name: '我是admin一号',
                path: '/admin1',
                meta: {
                    title: '我是admin一号', icon: 'el-icon-menu', roles: ['admin']
                },
                component: resolve => require(['../components/HelloWord.vue'], resolve)
            },
            {
                name: '我是admin二号',
                path: '/admin2',
                meta: {
                    title: '我是admin二号', icon: 'el-icon-menu', roles: ['admin']
                },
                component: resolve => require(['../components/tow.vue'], resolve)
            }
        ]
    },
    {
        path: '/one2',
        name: '我是主editor',
        meta: {
            title: '我是主editor',
            icon: 'el-icon-setting',
            roles: ['editor']
        },
        component: resolve => require(['../components/Sidebar_top.vue'], resolve),
        children: [
            {
                name: '我是editor一号',
                path: '/editor1',
                meta: {
                    title: '我是editor一号', icon: 'el-icon-menu', roles: ['editor']
                },
                component: resolve => require(['../components/HelloWord.vue'], resolve)
            },
            {
                name: '我是editor二号',
                path: '/editor2',
                meta: {
                    title: '我是editor二号', icon: 'el-icon-menu', roles: ['editor']
                },
                component: resolve => require(['../components/tow.vue'], resolve)

            }
        ]
    },
    {
        path: '/one3',
        name: '我是主3',
        meta: {
            title: '我是develop',
            icon: 'el-icon-setting',
            roles: ['develop']
        },
        component: resolve => require(['../components/Sidebar_top.vue'], resolve),
        children: [
            {
                name: '我是develop一号',
                path: '/develop',
                meta: {
                    title: '我是develop一号', icon: 'el-icon-menu', roles: ['develop']
                },
                component: resolve => require(['../components/HelloWord.vue'], resolve)
            },
            {
                name: '我是editor二号',
                path: '/develop2',
                meta: {
                    title: '我是editor二号', icon: 'el-icon-menu', roles: ['editor']
                },
                component: resolve => require(['../components/tow.vue'], resolve)

            }
        ]
    },
    { path: '*',hidden: true ,component: resolve => require(['../components/Header.vue'], resolve)}
]
