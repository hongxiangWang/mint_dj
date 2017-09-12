import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)
const state = {
    contentCon:'',
    con1:[{}],
    organized:{
        party:[],
        cascader_data:[]
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
