<template>
    <div>
        <div class="notice_title">
            {{oData.record_title}}
            <span class="type">{{record_type}}</span>
        </div>

        <div class="notice_action">
            <span>创建时间：{{oData.create_time}}</span>
        </div>


        <div v-html="oData.record_content" class="ql-editor"></div>
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

        <div id="record_info">
            <span class="title">其他信息</span>
            <mt-cell title="开始日期" :value="oData.activity_start_time"></mt-cell>
            <mt-cell title="结束日期" :value="oData.activity_end_time"></mt-cell>
            <mt-cell title="党支部" :value="oData.dept_name"></mt-cell>
            <mt-cell title="参会人员" :value="oData.attend_user_name"></mt-cell>
            <mt-cell title="主题" :value="oData.record_subtitle"></mt-cell>
            <mt-cell title="主持人" :value="oData.record_host_people"></mt-cell>
            <mt-cell title="记录人" :value="oData.record_write_people"></mt-cell>
            <mt-cell title="地点" :value="oData.activity_place"></mt-cell>
        </div>
    </div>
</template>

<script>
    const helper  = require('../../tools/helper');
    const record_type = [{label: '每周一学习', value: 1}, {label: '三会一课', value: 2}, {label: '新三会一课', value: 3}, {label: '主题党日', value: 4}, {label: '支局文化建设', value: 5}, {label: '其他', value: 6}];
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
                if(this.oData.file_id_list!=null){
                    this.oData.file_id_list.split('|').forEach(value => {
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
            },
            record_type(){
                return helper.getSelectLabel(record_type,this.oData.record_type)
            }
        },
        created(){
            this.$ajax.post('activity_record/activity_record_info',{id:this.$route.params.id}).then(res => {
                console.log('res.data----', res.data);
                if (res.data.errno == 0) {
                    this.oData = res.data.data;
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
<style lang="less">

    #record_info{
    margin-top:20px;
        .title{
            font-size: 12px;
            padding-left: 8px;
            color: orange;
            display: block;
            border-bottom:1px solid orange ;
        }
        .mint-cell,.mint-cell-wrapper{
            min-height:36px;
            font-size: 12px;
        }

    }
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
        border-bottom:1px solid orange;
        margin:0px 10px;
        padding:15px 0px;
        .type{
            position: absolute;
            top:45px;
            right: 5px;
            font-size: 12px;
            color: white;
            background-color: orange;
            padding: 2px 5px;
            border-radius:2px ;
        }
    }
    .notice_action{
        text-align: center;
        height:30px;
        margin:10px 0px;
        font-size: 12px;
    }
    .file_box{
        border:1px dashed red;
        margin:5px 10px;
        padding:10px 10px;
    }
</style>