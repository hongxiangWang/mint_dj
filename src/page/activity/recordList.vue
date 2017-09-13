<template>
    <div>
        <mt-cell :title="dept_name">
            <mt-button size="small" type="primary" @click="deptBt">选择</mt-button>
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
                <mt-cell :title="item.record_title" icon="more" is-link :to="'/home/noticeInfo/id/'+item.id">
                    <img slot="icon" src="../../assets/images/icon100.png" width="24" height="24">
                </mt-cell>
            </div>
        </div>

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
            }
        },
        methods: {
            //分页查询管理员信息
            loadMore() {
                let 
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


            },
            deptBt() {
                this.organiedPopup = true;
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
            let params = {
                page: 1, count: 10
            }
            getPagedRecordList(this, params)
        },
        filters: {},
    }

    function getPagedRecordList(vm, params) {
        vm.$ajax.post('/activity_record/activity_record_list', params).then(res => {
            if (res.data.errno == 0) {
                vm.items = res.data.data.data;
            } else {
                this.$toast({message: '获取失败', position: 'bottom', duration: 2500});
            }
        }).catch(err => {
            this.$toast({message: '获取失败', position: 'bottom', duration: 2500});
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

</style>