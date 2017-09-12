<template>
    <div>
        <div class="waterfall">
            <Waterfall :line-gap="200" :watch="items">
                <!-- each component is wrapped by a waterfall slot -->
                <Waterfall-slot
                        v-for="(item, index) in items"
                        :width="item.width"
                        :height="item.height"
                        :order="index"
                        :key="item.id"
                >
                    <div class="fengcai_pic_box">
                        <div class="pic_box">
                            <img src="../../assets/images/hamberger.png" alt="">
                        </div>
                        <div class="title_box">
                            titlefsdafsadfsdf
                        </div>
                        <div class="action_box">
                            <span class="publish_date">2017-09-12 12:30:23</span>
                            <span class="heart_up"><i class="fa fa-heart-o"></i></span>
                        </div>
                    </div>
                </Waterfall-slot>
            </Waterfall>
        </div>
        <div class="side-bar">
            <a href="javascript:" @click="fengcai_add" class="icon-blog">发布</a>
        </div>
    </div>
</template>

<script>
    import Waterfall from 'vue-waterfall/lib/waterfall.vue'
    import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot.vue'
    export default {
        data () {
            return {
                items:[
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    {
                        id:1,
                        width:190,
                        height:190
                    },
                    ],

            }
        },
        methods: {
            fengcai_add(){
                this.$router.push('/home/fengcaiAdd');
            }
        },
        computed: {},
        created(){

        },
        mounted(){

        },
        components: {
            Waterfall,
            WaterfallSlot
        },
    }
</script>
<style>
    .side-bar a,.chat-tips i {background: url(../../assets/images/icon66.png) no-repeat;}
    .side-bar {width: 66px;position: fixed;bottom: 30px;right: 10px;font-size: 0;line-height: 0;z-index: 100;}
    .side-bar a {width: 66px;height: 66px;display: inline-block;margin-bottom: 2px;}
    .side-bar a:hover {background-color: #669fdd;}
    .side-bar .icon-publish {background-position: 0 0px;}
    .waterfall{
        overflow: hidden;
        margin-top:50px;
        margin-left:10px;
    }
    .pic_box{

    }
    .pic_box img{
        width:190px;
        height:150px;
    }
    .title_box{
        font-size:14px;
    }
    .action_box{
        margin-top:5px;
    }
    .action_box .publish_date{
        font-size:12px;
    }
    .action_box .heart_up{
        float:right;
        margin-right:10px;
    }
</style>