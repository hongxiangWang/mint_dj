import App from '../App.vue'

const home = r => require.ensure([], () => r(require('../page/home/index.vue')), 'home');
export default [{
    path: '/',
    component: home
}]

