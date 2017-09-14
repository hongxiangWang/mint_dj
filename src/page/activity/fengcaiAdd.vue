<template>
    <div>
        <div class="fengcai_add_box">
            <mt-field label="展示标题" placeholder="请输入风采展示标题" v-model="fengcai.title"></mt-field>
            <div class="fenge_bar"></div>
            <div class="file_upload_box">
                <!--<VueImgInputer v-model="picValue" theme="light" size="large"></VueImgInputer>-->
                <mt-field label="风采图片" id="upload">
                    <el-upload
                            multiple
                            :action="uploadUri"
                            list-type="picture-card"
                            :file-list="fileList"
                            :on-preview="uploadPreview"
                            :on-success="uploadSuccess"
                            :on-remove="uploadRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="large">
                        <img width="96%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </mt-field>
            </div>
            <div class="submit_box">
                <div class="publish_box" v-if="is_login">
                    <mt-button type="primary" size="large" :disabled="is_dis" @click="fengcai_add"
                               style="width:98%;margin:0px auto;">
                        发布信息
                    </mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueImgInputer from 'vue-img-inputer'
    export default {
        data () {
            return {
                is_dis: false,
                fengcai: {
                    title: '',
                    fengcai_pic_id_str: []
                },
                fengcai_pic: {
                    pic_url: '',
                    pic_content: ''
                },
                fengcai_pic_json_array: [],

                uploadUri: require('../../value/string').uploadUrl,
                fileList: [],
                dialogVisible: false,
                dialogImageUrl: '',
                span_index: 0
            }
        },
        methods: {
            uploadRemove(file, fileList) {
                let $ = this.$jquery;
                this.fengcai.fengcai_pic_id_str.forEach((v, i, s) => {
                    //服务端上传 - 用的这个
                    if (file.response != undefined && v == file.response.data) {
                        //清除对应的input输入框,
                        $("#span_" + i + "").remove();
                        this.fengcai_pic_json_array.splice(i, 1);
                        s.splice(i, 1);
                    }
                    //本地上传
                    if (file.response == undefined && v == file.url.replace(require('../../value/string').fileread, '').replace(`ctdj/www/static`, `file`)) {
                        //清除对应的input输入框,
                        $("#span_" + i + "").remove();
                        this.fengcai_pic_json_array.splice(i, 1);
                        s.splice(i, 1);
                    }
                });
//                console.log(this.fengcai_pic_json_array);
            },
            uploadPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadSuccess(res) {
                if (res.errno == 0) {
                    this.fengcai.fengcai_pic_id_str.push(res.data);
                    let $ = this.$jquery;
                    let textarea_html = "<textarea class='pic_content_textarea' style='width:100%;height:100px;border:1px solid #ccc' placeholder=\"请输入内容\" />";
                    $(".el-upload-list--picture-card .el-upload-list__item").each(function (i, item) {
                        $(this).after("<span id=\"span_" + i + "\" class='pic_content_span'>" + textarea_html + "</span>");
                        //删除多余的input，只保留一个
                        $("#span_" + i + "").eq(0).nextAll("#span_" + i + "").remove();
                    });
                    //绑定对象

                }
            },
            //处理新增逻辑
            fengcai_add(){
                this.is_dis = true;
                let $ = this.$jquery;
                var that = this;
                this.$nextTick(_ => {
                    this.fengcai.fengcai_pic_id_str.forEach((item, i) => {
                        let tmp_pic_content = $("#span_" + i + "").find("textarea")[0].value;
                        let fengcai_pic = {pic_url: item, pic_content: tmp_pic_content};
                        this.fengcai_pic_json_array.push(fengcai_pic);
                    });
                    console.log(this.fengcai);
                    console.log(this.fengcai_pic_json_array);
                    //ajax传送
                    let params = {title: this.fengcai.title, fengcai_pic_json_array: this.fengcai_pic_json_array};
                    that.$ajax.post('/fengcai/fengcai_add', params).then(res => {
                        if (res.data.errno == 0) {
                            that.$message({message: '上传成功', type: 'success'});
                            that.$router.push('/home/fengcaiList');
                        } else {
                            this.$message({message: '上传失败，请重试', type: 'error'});
                        }
                    }).catch(err => {
                        that.$message({message: '抱歉，获取数据失败，请重试', type: 'error'})
                        console.log('----', err)
                    });
                });
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

        },
        components: {
            VueImgInputer
        }
    }
</script>
<style>
    .fenge_bar {
        border-bottom: 1px dashed lightsalmon;
        height: 1px;
        display: block;
        margin: 0px auto;
    }

    #upload .mint-field-core {
        max-width: 0;
    }

    .el-upload--picture-card {
        min-width:240px;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        width: 100%;
        height: 100%;
    }

    input.pic_content_input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    .file_upload_box {
        margin: 10px 0px;
    }

    .pic_content_span {
        display: block;
        margin-bottom: 10px;
    }

    .submit_box {
        margin-top: 10px;
    }
</style>