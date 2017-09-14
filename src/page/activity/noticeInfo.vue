<template>
    <div>
        <div class="notice_title">{{oData.title}}</div>
        <div class="notice_action">
            <span>发布时间：{{oData.create_time}}</span>
        </div>
        <div v-html="oData.content" class="ql-editor"></div>
        <div class="file_box" v-if="file_list.length>0">
            <label v-if="file_list.length>0">附件：</label>
            <div class="file_attach_box">
                <el-button
                        v-for="item in file_list"
                        :key="item.name"
                        type="text"
                        @click="downLoadFile(item)">
                    {{item.name}}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    const helper  = require('../../tools/helper');
    export default {
        data () {
            return {
                oData: {}
            }
        },
        methods: {
            downLoadFile(file){
                let httpUri = require('../../value/string.js').fileread+file.uri;
                console.log(httpUri,'frssss---');
                helper.downloadFile(httpUri);
            }
        },
        computed: {
            file_list() {
                let arr = [];
                if(this.oData.file_id_str!=null){
                    this.oData.file_id_str.split('|').forEach(value => {
                        if (value != null && value.length > 3) {
                            let json = {
                                name: value.substr(value.indexOf('_') + 1),
                                uri: value
                            }
                            // json.isImg = isImage(json.name);
                            arr.push(json);
                        }
                    });
                    return arr;
                }else{
                    return [];
                }
            }
        },
        created(){
            this.$ajax.get('/notice/get_notice/id/'+this.$route.params.id).then(res => {
                console.log('res.data----', res.data);
                if (res.data.errno == 0) {
                    this.oData = res.data.data;
                    this.$indicator.close();
                }
            }).catch(err => {
                this.$message({message: '抱歉，获取数据失败，请重试', type: 'error'});
                console.log('----', err);
                this.$indicator.close();
            });
        },
        mounted(){

        }
    }
</script>
<style>
    .ql-editor{
        font-size:14px;
        padding:10px 10px;
    }
    .ql-editor p{
        line-height:200%;
    }
    .notice_title{
        text-align:center;
        font-size:18px;
        font-weight:bold;
        border-bottom:1px solid red;
        margin:0px 10px;
        padding:15px 0px;
    }
    .notice_action{
        text-align: center;
        height:30px;
        margin:10px 0px;
    }
    .file_box{
        border:1px dashed red;
        margin:5px 10px;
        padding:10px 10px;
    }
</style>