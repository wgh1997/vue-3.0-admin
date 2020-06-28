import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from './views/login/Login.vue'
import '@/permission'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: function (h) { return h(this.$store.state.user.token ? App : Login) }
    // render: function (h) { return h(App) }
}).$mount('#app')
