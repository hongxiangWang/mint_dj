import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import store from './vueStore/index.js'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'


import axios from 'axios'
import config from './api/config'
const localStore = require('store'); //解决IE9 的loacalstore问题
const jquery = require('jquery');     
const axiosInit = axios.create(config);


Vue.use(VueRouter)
Vue.use(MintUI)

Vue.prototype.$ajax = axiosInit;
Vue.prototype.$jquery = jquery;
Vue.prototype.$localStore = localStore;


const router = new VueRouter({
    routes: routes,

})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

