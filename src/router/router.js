const App = r => require.ensure([], () => r(require('../App.vue')), 'App');
const home = r => require.ensure([], () => r(require('../page/home/index.vue')), 'home');
const main = r => require.ensure([], () => r(require('../page/home/main.vue')), 'main');
const recordAdd = r => require.ensure([], () => r(require('../page/activity/recordAdd.vue')), 'recordAdd');
const recordList = r => require.ensure([], () => r(require('../page/activity/recordList.vue')), 'recordList');
const noticeAdd = r => require.ensure([], () => r(require('../page/activity/noticeAdd.vue')), 'noticeAdd');
const noticeList = r => require.ensure([], () => r(require('../page/activity/noticeList.vue')), 'noticeList');
const noticeInfo = r => require.ensure([], () => r(require('../page/activity/noticeInfo.vue')), 'noticeInfo');
const fengcaiAdd = r => require.ensure([], () => r(require('../page/activity/fengcaiAdd.vue')), 'fengcaiAdd');
const fengcaiList = r => require.ensure([], () => r(require('../page/activity/fengcaiList.vue')), 'fengcaiList');
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
                name:'main',
                // 使用vue-route + Webpack 的 code splitting feature 把组件按组分块
                component: main
            },
            {
                path: 'recordAdd',
                name:'recordAdd',
                component: recordAdd,
            },
            {
                path: 'recordList',
                name:'recordList',
                component: recordList,
            },
            {
                path: 'noticeAdd/notice_type/:notice_type',
                name:'noticeAdd',
                component: noticeAdd,
            },
            {
                path: 'noticeInfo/id/:id',
                name:'noticeInfo',
                component: noticeInfo,
            },
            {
                path: 'noticeList/notice_type/:notice_type',
                name:'noticeList',
                component: noticeList,
            },
            {
                path: 'fengcaiAdd',
                name:'fengcaiAdd',
                component: fengcaiAdd,
            },
            {
                path: 'fengcaiList',
                name:'fengcaiList',
                component: fengcaiList,
            },
        ]
    },
    {
        path: '/',
        component: login,
    },
]

