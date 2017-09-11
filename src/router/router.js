const App = r => require.ensure([], () => r(require('../App.vue')), 'App');
const home = r => require.ensure([], () => r(require('../page/home/index.vue')), 'home');
const main = r => require.ensure([], () => r(require('../page/home/main.vue')), 'main');
const recordAdd = r => require.ensure([], () => r(require('../page/activity/recordAdd.vue')), 'recordAdd');
const login = r => require.ensure([], () => r(require('../page/login/index.vue')), 'login');
export default [{
    path: '/index',
    component: App,
    name: 'index'
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children:[
            {
                path: 'main',
                // 使用vue-route + Webpack 的 code splitting feature 把组件按组分块
                component: main
            },
            {
                path: '/recordAdd',
                component: recordAdd,
            },
        ]
    },
    {
        path: '/',
        component: login,
    },
]

