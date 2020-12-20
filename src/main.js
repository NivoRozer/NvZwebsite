import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import 'normalize.css'
import msg from 'assets/js/msg.js'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

Vue.use(msg)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


//解决路由重复点击报错问题(Push)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

//解决路由重复点击报错问题(Replace)
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
}