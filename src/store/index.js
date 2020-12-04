import Vue from 'vue'
import Vuex from 'vuex'

import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        music: music
    }
})
