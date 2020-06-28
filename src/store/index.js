import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import Label from './Label/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        Label
    },
    getters
})

export default store
