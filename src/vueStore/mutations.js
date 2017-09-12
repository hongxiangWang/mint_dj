
/*
* organizedSet
* */
const ORGANIZED_PARTY = 'ORGANIZED_PARTY' // 组织数组 organizedSet
const ORGANIZED_CASCADER_DATA = 'ORGANIZED_CASCADER_DATA' // 组织数组 organizedSet
export default {
    /*
    * organizedSet
    * */
    [ORGANIZED_PARTY](state, payload) {
        state.organized.party = payload;
    },
    [ORGANIZED_CASCADER_DATA](state, payload){
        state.organized.cascader_data = payload;

    }

}
