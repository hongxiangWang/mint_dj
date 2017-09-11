const App = r => require.ensure([], () => r(require('../App.vue')), 'App');
const home = r => require.ensure([], () => r(require('../page/home/index.vue')), 'home');
const recordAdd = r => require.ensure([], () => r(require('../page/activity/recordAdd.vue')), 'recordAdd');
const login = r => require.ensure([], () => r(require('../page/login/index.vue')), 'login');
export default [{
    path: '/index',
    component: App,
    name: 'index'
}, {
    path: '/home',
    name: 'home',
    component: home,
},
    {
        path: '/recordAdd',
        component: recordAdd,
    },
    {
        path: '/',
        component: login,
    },
]

