<template>
    <div>
        <div class="fengcai_info_box">
            <div class="info_title">{{fengcai_info.title}}</div>
            <div class="info_action">发布时间：{{fengcai_info.create_time}}</div>
            <div class="info_body">
                <div class="item_box" v-for="(item,index) in fengcai_info.fengcai_pic_array" :key="item.id">
                    <div class="info_pic_box">
                        <img v-lazy="item.pic_url" :src="item.pic_url" :alt="item.title"/>
                    </div>
                    <div class="info_text_box">
                        <p>图片描述：{{item.pic_content}}</p>
                    </div>
                    <div class="info_action_box">
                        发布人：{{fengcai_info.big_dept_name}}-{{fengcai_info.small_dept_name}}-{{fengcai_info.people_name}}
                    </div>
                    <div class="dianzan_box" @click="dianzan">
                        <i class="fa fa-thumbs-o-up"> <span class="zan_num">120</span></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                fengcai_info: {},
            }
        },
        methods: {
            dianzan(){
                const $ = this.$jquery;
                $(".dianzan_box>i").removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up red');
                console.log($(".zan_num").val());
                $(".zan_num").text(parseInt($(".zan_num").text())+1);
            }
        },
        computed: {},
        created(){
            this.$ajax.get('/fengcai/get_fengcai/id/' + this.$route.params.id).then(res => {
                console.log('res.data----', res.data);
                if (res.data.errno == 0) {
                    this.fengcai_info = res.data.data;
                    this.fengcai_info.fengcai_pic_array.forEach(item => {
                        item.pic_url = require('../../value/string').fileread + item.pic_url;
                    });
                }
            }).catch(err => {
                this.$message({message: '抱歉，获取数据失败，请重试', type: 'error'});
                console.log('----', err);
            });
        },
        mounted(){

        }
    }
</script>
<style>
    .fengcai_info_box {
        padding: 5px 5px;
    }

    .info_title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid red;
        margin: 0px 10px;
        padding: 15px 0px;
    }

    .info_action {
        text-align: center;
        height: 30px;
        margin: 10px 0px;
    }
    .info_pic_box{
        padding:10px;
        border:1px solid #ccc;
    }
    .info_pic_box img{
        width:100%;
    }

    .red{
        color:red;
    }
    .dianzan_box{
        width:50%;
        text-align:center;
        margin:10px auto;
        height:50px;
        line-height:50px;
    }
    .dianzan_box i{
        font-size:32px;
        line-height:50px;
    }
    .dianzan_box i span.zan_num{
        font-size:32px;
        margin-left:10px;
        color:orangered;
        font-weight:bold;
    }
</style>