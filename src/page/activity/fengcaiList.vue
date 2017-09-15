<template>
    <div>
        <div class="waterfall">
            <!--<Waterfall :line-gap="190" :max-line-gap="200" :watch="items">-->
                <!--&lt;!&ndash; each component is wrapped by a waterfall slot &ndash;&gt;-->
                <!--<Waterfall-slot-->
                        <!--v-for="(item, index) in items"-->
                        <!--:width="item.width"-->
                        <!--:height="item.height"-->
                        <!--:order="index"-->
                        <!--:key="item.id"-->
                <!--&gt;-->
                    <div class="fengcai_pic_box" v-for="(item, index) in items" :key="item.id">
                        <router-link :to="'/fengcaiInfo/id/'+item.id">
                        <div class="pic_box">
                            <img :src="item.pic_url" :alt="item.title" />
                        </div>
                        <div class="title_box">
                            {{item.title}}
                        </div>
                        <div class="action_box">
                            <span class="publish_date">{{item.create_time}}</span>
                            <span class="heart_up">
                                <i class="fa fa-heart">
                                    <span class="zan_num">{{item.zan_num}}</span>
                                </i>
                            </span>
                        </div>
                        </router-link>
                    </div>
                <!--</Waterfall-slot>-->
            <!--</Waterfall>-->
        </div>
        <div class="side-bar">
            <a href="javascript:" @click="fengcai_add" class="icon-blog">发布</a>
        </div>
    </div>
</template>

<script>
//    import Waterfall from 'vue-waterfall/lib/waterfall.vue'
//    import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot.vue'
    export default {
        data () {
            return {
                result_data: [],
                items: [
//                    {
//                        id:1,
//                        width:190,
//                        height:190
//                    }
                ],

            }
        },
        methods: {
            fengcai_add(){
                let token = this.$localStore.get('token');
                if(token==null){
                    this.$toast({ message: '请管理员先登陆',
                        position: 'bottom',
                        duration: 2000});
                    return false;
                }
                this.$router.push('/fengcaiAdd');
            },
            getFengcaiList(vm, params){
                vm.$ajax.post('/fengcai/fengcai_list', params).then(res => {
                    if (res.data.errno == 0) {
                        vm.result_data = res.data.data;
                        vm.result_data.forEach(item => {
                            item.width = 190;
                            item.height = 190;
                            item.pic_url = require('../../value/string').fileread+item.pic_url;
                            vm.items.push(item);
                        });
                        console.log(this.items);
                    } else {
                        vm.$message({message: '内容获取失败，请重试', type: 'error'});
                    }
                }).catch(err => {
                    vm.$message({message: '抱歉，获取数据失败，请重试', type: 'error'})
                    console.log('----', err)
                });
            }
        },
        computed: {},
        created(){

        },
        mounted(){
            let params = {};
            this.getFengcaiList(this, params);
        },
        components: {
//            Waterfall,
//            WaterfallSlot
        },
    }
</script>
<style>
    .side-bar a, .chat-tips i {
        background: url(../../assets/images/icon66.png) no-repeat;
    }

    .side-bar {
        width: 66px;
        position: fixed;
        bottom: 40px;
        right: 10px;
        font-size: 0;
        line-height: 0;
        z-index: 100;
    }

    .side-bar a {
        width: 66px;
        height: 66px;
        display: inline-block;
        margin-bottom: 2px;
    }

    .side-bar a:hover {
        background-color: #669fdd;
    }

    .side-bar .icon-publish {
        background-position: 0 0px;
    }

    .waterfall {
        overflow: hidden;
        margin-top: 50px;
        width:100%;
        /*margin-left: 10px;*/
    }

    .fengcai_pic_box{
        width:48%;
        margin-left:1%;
        float:left;
        display: inline-block;
    }
    .fengcai_pic_box a{
        text-decoration: none;
    }
    .pic_box {

    }
    .pic_box img {
        width:100%;
        height:160px;
        max-width: 190px;
        max-height: 190px;
    }

    .title_box {
        font-size: 14px;
        color:#444;
        text-decoration: none;
    }
    .action_box {
        margin-top: 5px;
        color:#444;
        text-decoration: none;
    }

    .action_box .publish_date {
        font-size: 12px;
    }

    .action_box .heart_up {
        float: right;
        margin-right: 10px;
        color:red;
    }
    .action_box span.zan_num{
        margin-left:5px;
    }
</style>