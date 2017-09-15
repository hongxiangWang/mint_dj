<template>
    <div>
        <mt-cell :title="dept_name" class="dept_id">
            <mt-button size="small" @click="resetBt" v-show="dept_name!='选择党支部'">重置</mt-button>
            <mt-button size="small" type="primary" @click="deptBt" style="margin-left: 5px">选择</mt-button>
            <mt-popup
                    style="width: 100%;;bottom: 0px"
                    v-model="organiedPopup"
                    position="bottom">
                <picker-organied
                        @cancel="pickCancel"
                        @submit="pickerSubmit"></picker-organied>
            </mt-popup>
        </mt-cell>
        <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <div class="item_list" v-for="item in items" :key="item.id">
                <mt-cell :title="item.record_title" icon="more" is-link :to="'/home/recordInfo/id/'+item.id">
                    <img slot="icon" src="../../assets/images/icon100.png" width="24" height="24">
                </mt-cell>
            </div>
        </div>

        <p style="text-align: center" v-show="isShowTips"> 无数据</p>
        <div style="text-align: center" v-show="isShowRest">
            <br>

            <mt-button @click="refreshBt">重试一下</mt-button>
        </div>

        <mt-button class="paletteBt" v-if="require('store').get('people_info')!=null" @click="paletteBt">
            <div class="my-icon-button"></div>
        </mt-button>

    </div>
</template>

<script>
    import pickerOrganied from '../../components/pickerOrganied.vue'

    export default {
        data() {
            return {
                items: [],
                result_data: [],
                loading: false,
                page: 1,
                count: 10,
                notice_type: 1,
                real_count: 0,
                organiedPopup: false,
                dept_name: '选择党支部',
                currentPage: 1,
                listNum: 10,
                small_dept_id: '',
                isShowRest: false,
                isShowTips: false
            }
        },
        methods: {
            //分页查询管理员信息
            loadMore() {
                if (this.organiedPopup) {
                    return;
                }
                console.log('loading......');
                this.currentPage++;
                getPagedRecordList(this)
            },
            notice_add() {
                this.$router.push({name: 'noticeAdd', params: {notice_type: this.notice_type}});
            },
            pickCancel() {
                this.organiedPopup = false;
            },
            pickerSubmit(call) {
                this.organiedPopup = false;
                this.dept_name = call.label;
                this.small_dept_id = call.value;
                this.currentPage = 1;
                this.items = [];
                getPagedRecordList(this)

            },
            deptBt() {
                this.organiedPopup = true;
            },
            resetBt() {
                this.currentPage = 1;
                this.small_dept_id = '';
                this.items = [];
                this.dept_name = '选择党支部'
                getPagedRecordList(this);

            },
            paletteBt() {
                this.$router.push('/home/recordAdd')
            },
            refreshBt(){
                getPagedRecordList(this);
            }

        },
        computed: {
            is_login() {
                let token = this.$localStore.get('token');
                if (token) {
                    return true;
                }
                return false;
            }
        },
        components: {
            pickerOrganied
        },
        mounted() {
            let windowsHeight = window.screen.height;
            let listHeight = windowsHeight - 40 - 48;
            let listNum = Math.ceil(listHeight / 48);
            this.listNum = listNum;
            console.log('windowsHeight---', listNum)
            getPagedRecordList(this)
        },
        filters: {},
    }

    function getPagedRecordList(vm) {
        vm.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        let params = {
            page: vm.currentPage,
            count: vm.listNum,
            small_dept_id: vm.small_dept_id,
        }
        console.log('params---', params)
        vm.$ajax.post('/activity_record/activity_record_list', params).then(res => {
            if (res.data.errno == 0) {
                vm.isShowRest = false;
                console.log('----', res.data)
                res.data.data.data.forEach(v => {
                    vm.items.push(v);
                });
                if(vm.items==0){
                    vm.isShowTips = true;
                }else {
                    vm.isShowTips = false;
                }
                vm.$indicator.close();


            } else {
                vm.$toast({message: '获取失败', position: 'bottom', duration: 2500});
                vm.isShowRest = true;
                vm.isShowTips = false;
                vm.$indicator.close();

            }
        }).catch(err => {
            vm.$toast({message: '获取失败', position: 'bottom', duration: 2500});
            vm.isShowRest = true;
            vm.isShowTips = false;
            vm.$indicator.close();
            console.log('----', err)
        });
    }
</script>
<style>
    .item_list {
        display: block;
        background: #fff;
    }

    .mint-cell-text, .mint-cell-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .paletteBt {
        height: 48px;
        width: 48px;
        line-height: 48px;
        background-color: orange;
        font-size: 2rem;
        vertical-align: middle;
        color: white;
        bottom: 60px;
        right: 30px;
        border-radius: 50%;
        top: auto;
        left: auto;
        position: fixed;
    }

    .paletteBt:before {
        content: '+';
        height: 48px;
        vertical-align: middle;
        position: relative;
        top: -6px;
    }
</style>