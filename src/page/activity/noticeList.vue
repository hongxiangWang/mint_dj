<template>
    <div>
        <!--<div class="publish_box" v-if="is_login">-->
            <!--<mt-button type="primary" size="large" @click="notice_add" style="width:98%;margin:0px auto;">发布信息</mt-button>-->
        <!--</div>-->
        <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <div class="item_list" v-for="item in items" :key="item.id">
                <router-link :to="'/home/noticeInfo/id/'+item.id">
                    <div class="item_left">
                        <div class="item_left_pic">
                            <img src="../../assets/images/icon100.png" width="44" height="44" alt="" align="middle">
                        </div>
                        <div class="item_left_title">
                            {{item.title}}
                        </div>
                    </div>
                    <div class="item_right">
                        <span>  <i class="fa fa-chevron-right"></i>  </span>
                    </div>
                    <div class="border_line"></div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                items: [],
                result_data: [],
                loading: false,
                page: 1,
                count: 10,
                notice_type: 1,
                real_count: 0
            }
        },
        methods: {
            //分页查询管理员信息
            getPagedItemList(vm, params){
                vm.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                vm.$ajax.post('/notice/notice_list', params).then(res => {
                    console.log('res.data----', res.data);
                    if (res.data.errno == 0) {
                        vm.result_data = res.data.data;
                        vm.result_data.data.forEach(item => {
                            vm.items.push(item);
                        });
                        vm.$indicator.close();
                    }
                }).catch(err => {
                    vm.$message({message: '抱歉，获取数据失败，请重试', type: 'error'})
                    console.log('----', err);
                    vm.$indicator.close();
                });
            },
            loadMore() {
                console.log('enter loadMore===>');
                if (this.real_count == 0) {
                    this.real_count = this.items.length;
                }
                console.log('real_count===>', this.real_count);
                this.loading = true;
                let now_page = Math.ceil(this.items.length / this.real_count);

                let params_now = {page: now_page, count: this.real_count, notice_type: this.notice_type}
                this.getPagedItemList(this, params_now);
            },
            notice_add(){
                this.$router.push({name:'noticeAdd',params:{notice_type:this.notice_type}});
            }
        },
        computed: {
            is_login(){
                let token = this.$localStore.get('token');
                if (token) {
                    return true;
                }
                return false;
            }
        },
        created(){

        },
        mounted(){
            console.log('mounted:==>', this.$route);
            this.notice_type = this.$route.params.notice_type;
            let params_default = {page: 1, count: 10, notice_type:this.notice_type};
            this.getPagedItemList(this, params_default);
        },
        filters: {},
    }
</script>
<style scoped>
    .item_list {
        display: block;
        height:80px;
        line-height: 80px;
        background: #fff;
        width:100%;
    }

    .item_left {
        float: left;
        width: 90%;
        height: 80px;
        display: inline-block;
        font-size: 14px;
    }

    .item_left_title {
        float:right;
        display: inline-block; /*让span 标签变成行内标签但具有宽高属性*/
        white-space: nowrap; /*文本不进行换行*/
        overflow: hidden; /*隐藏溢出文本*/
        text-overflow: ellipsis; /*多出文本使用 ....代替*/
        width: 80%; /*自适应布局*/
        text-decoration: none;
        color: #444;
    }

    .item_left_pic {
        float: left;
        width: 20%;
        text-align: center;
    }

    item_left_pic img {
        width:90%;
    }

    .item_title {

    }

    .item_right {
        float:right;
        width:5%;
        text-align: right;
        padding-right: 10px;
        color: #ccc;
    }
    .border_line {
        clear: both;
        width: 96%;
        margin: 0px auto;
        border: 1px solid #f5f5f5;
    }
    .publish_box{
        margin-top:50px;
        margin-bottom:10px;
        text-align: center;
    }
</style>