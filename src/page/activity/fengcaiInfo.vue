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
                        <p><strong>图片描述：</strong>{{item.pic_content}}</p>
                    </div>
                    <div class="info_action_box">
                        <strong>发布人：</strong>{{fengcai_info.big_dept_name}}-{{fengcai_info.small_dept_name}}-{{fengcai_info.people_name}}
                    </div>
                    <div class="dianzan_box" @click="dianzan">
                        <i class="fa fa-thumbs-o-up"> <span class="zan_num">{{fengcai_info.zan_num}}</span></i>
                    </div>
                    <div class="delete_box" v-if="is_can_delete">
                        <mt-button type="danger" size="large" @click="delete_fengcai">删除</mt-button>
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
                this.$ajax.post('/fengcai/update_zan_num',{id:this.$route.params.id}).then(res => {
                    console.log('res.data----', res.data);
                    if (res.data.errno == 0) {
                        this.$toast({message:'点赞成功',position:'bottom'});
                        $(".zan_num").text(parseInt($(".zan_num").text())+1);
                    }else{
                        this.$toast({message:'点赞失败',position:'bottom'});
                    }
                }).catch(err => {
                    this.$message({message: '抱歉，获取数据失败，请重试11', type: 'error'});
                    console.log('----', err);
                });
            },
            //删除当前风采
            delete_fengcai(){
                this.$messagebox.confirm('确定要删除吗').then(resolve_action=>{
                    let fengcai_id = this.$route.params.id;
                    this.$ajax.post('/fengcai/fengcai_delete',{id:fengcai_id}).then(res => {
                        console.log('res.data----', res.data);
                        if (res.data.errno == 0) {
                            this.$toast({message:'删除成功',position:'bottom'});
                            this.$router.replace('/home/fengcaiList');
                        }else{
                            this.$toast({message:'删除失败',position:'bottom'});
                        }
                    }).catch(err => {
                        this.$toast({message:'删除失败，请重试',position:'bottom'});
                        console.log('----', err);
                    });
                },reject_action=>{
                    console.log('点击取消');
                });
            }
        },
        computed: {
            //是否有权限能删除
            is_can_delete(){
                if(this.$localStore.get('token')){
                    let admin_id = this.$localStore.get('people_info')[0].admin_id;
                    let fengcai_admin_id = this.fengcai_info.admin_id;
                    console.log(admin_id+"===="+fengcai_admin_id);
                    if(admin_id==fengcai_admin_id){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            },
        },
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
                this.$message({message: '抱歉，获取数据失败，请重试22', type: 'error'});
                console.log('----', err);
            });
//            console.log(this.$localStore.get('people_info').admin_id);
//            console.log(this.fengcai_info.admin_id);
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