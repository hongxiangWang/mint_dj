<template>
    <div>

        <mt-field label="党支部：" type="text" disabled="disabled" v-model="deptment_name" class="deptment_name">
            <!--<small>{{deptment_name}}</small>-->
            <mt-button @click="organiedSelect" size="small" type="primary">点击选择</mt-button>
            <mt-popup
                    style="width: 100%;margin-bottom: 30px"
                    v-model="organiedPopup"
                    position="bottom">
                <organied-popup
                        @cancel="pickCancel"
                        @submit="pickerSubmit"></organied-popup>
            </mt-popup>

        </mt-field>
        <mt-field label="活动类型：" type="text" disabled="disabled" v-model="type_name">
            <mt-button @click="typeSelect" size="small" type="primary">点击选择</mt-button>
        </mt-field>

        <mt-field label="开始时间：" disabled="disabled" type="date" v-model="form.start_time">
            <mt-button @click="startData" size="small" type="primary">点击选择</mt-button>
            <mt-datetime-picker
                    ref="startPicker"
                    type="date"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="startDateChange"
                    v-model="form.activity_start_time">
            </mt-datetime-picker>
        </mt-field>

        <mt-field label="结束时间：" disabled="disabled" type="date" v-model="form.end_time">
            <mt-button @click="endData" size="small" type="primary">点击选择</mt-button>
            <mt-datetime-picker
                    ref="endPicker"
                    type="date"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="endDateChange"
                    v-model="form.activity_end_time">
            </mt-datetime-picker>
        </mt-field>

        <mt-field label="活动名称：" placeholder="请输入用户名" v-model="form.record_title"></mt-field>
        <mt-field label="参会人员：" type="text" disabled="disabled" v-model="attend_user_str">
            <mt-button @click="attendList" size="small" type="primary">点击选择</mt-button>
            <mt-popup
                    style="width: 90%;margin-bottom: 30px; margin-top: 40px;top:0;bottom: 30px"
                    v-model="popupVisible"
                    position="bottom">
                <deptmentpeople
                        style="height:100%;overflow: scroll;"
                        :dept_id="dept_id"
                        @cancel="deptCancel"
                        @submit="deptSubmit"></deptmentpeople>
            </mt-popup>
        </mt-field>
        <mt-field label="主持人：" placeholder="请输入" v-model="form.record_host_people"></mt-field>
        <mt-field label="记录人：" placeholder="请输入" v-model="form.record_write_people"></mt-field>
        <mt-field label="活动地点：" placeholder="请输入" v-model="form.activity_place"></mt-field>
        <mt-field label="议会主题：" placeholder="请输入" v-model="form.record_subtitle"></mt-field>
        <mt-field label="活动内容：" placeholder="请输入" v-model="form.record_content" type="textarea"></mt-field>
        <mt-field label="附件："id="upload">
            <el-upload
                    :action="uploadUri"
                    list-type="picture-card"
                    :file-list="fileList"
                    :on-preview="uploadPreview"
                    :on-success="uploadSuccess"
                    :on-remove="uploadRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="large">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </mt-field>
        <br/>

        <mt-button size="large" type="primary" @click="submit">提交</mt-button>

        <br/>

        <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>
<script>
    import deptmentpeople from '../../components/deptmentPeople.vue'
    import organiedPopup from '../../components/pickerOrganied.vue'

    export default {
        data() {
            return {
                actions: [{name: '每周一学习', method: this.sheetClick, id: 1},
                    {name: '三会一课', method: this.sheetClick, id: 2},
                    {name: '新三会一课', method: this.sheetClick, id: 3},
                    {name: '主题党日', method: this.sheetClick, id: 4},
                    {name: '支局文化建设', method: this.sheetClick, id: 5},
                    {name: '其他', method: this.sheetClick, id: 6}],
                sheetVisible: false,
                form: {
                    record_title: '',
                    record_type: '',
                    start_time: '',
                    activity_start_time: new Date(),
                    end_time: '',
                    activity_end_time: new Date(),
                    record_host_people: '',
                    record_write_people: '',
                    activity_place: '',
                    record_subtitle: '',
                    record_content: '',
                    file_id_arr: []
                },
                deptment_name: '',
                type_name: '',
                popupVisible: false,
                organiedPopup: false,
                attend_user_str: '',
                dept_id: 0,
                uploadUri: require('../../value/string').uploadUrl,
                fileList: [],
                dialogVisible: false,
                dialogImageUrl:'',
                attend_user_id:''
            }
        },
        components: {deptmentpeople, organiedPopup},
        methods: {
            typeSelect() {
                this.sheetVisible = true;
            },
            sheetClick(call) {
                this.form.record_type = call.id;
                this.type_name = call.name;
            },
            startData() {
                this.$refs.startPicker.open();
            },
            endData() {
                this.$refs.endPicker.open();
            },
            startDateChange(call) {
                this.form.start_time = call.Format('yyyy-MM-dd');
            },
            endDateChange(call) {
                this.form.end_time = call.Format('yyyy-MM-dd');
            },
            attendList() {
                if (this.dept_id == 0) {
                    this.$toast({
                        message: '请选择党支部',
                        position: 'bottom',
                        duration: 2500
                    });
                    return;
                }
                this.popupVisible = true;
            },
            organiedSelect() {
                this.organiedPopup = true;
            },
            pickCancel() {
                this.organiedPopup = false;
            },
            pickerSubmit(call) {
                this.dept_id = call.value;
                console.log(call.value)
                this.organiedPopup = false;
                this.deptment_name = call.label
            },
            deptCancel() {
                this.popupVisible = false;
            },
            deptSubmit(call) {
                this.attend_user_str = call.label;
                this.attend_user_id = call.value;
                this.popupVisible = false;
            },
            uploadRemove(file, fileList) {
                this.form.file_id_arr.forEach((v, i, s) => {
                    if (file.response != undefined && v == file.response.data) {
                        s.splice(i, 1);
                    }
                    if (file.response == undefined && v == file.url.replace(require('../../value/string').fileread, '').replace(`ctdj/www/static`, `file`)) {
                        s.splice(i, 1);
                    }
                })
            },
            uploadPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadSuccess(res) {
                if (res.errno == 0) {
                    this.form.file_id_arr.push(res.data)
                }
                console.log('res-----', res)
            },

            submit(){
                if(this.dept_id==0){
                    this.$toast({message: '请选择党支部', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_type==''){
                    this.$toast({message: '活动类型未选', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.start_time==''){
                    this.$toast({message: '活动开始时间未选', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.end_time==''){
                    this.$toast({message: '活动结束时间未选', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_title==''){
                    this.$toast({message: '活动名称未填', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.attend_user_str==''){
                    this.$toast({message: '参会人员未选', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_host_people==''){
                    this.$toast({message: '主持人未填', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_write_people==''){
                    this.$toast({message: '记录人未填', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_subtitle==''){
                    this.$toast({message: '议会主题未填', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_content==''){
                    this.$toast({message: '活动内容未填', position: 'bottom', duration: 2500});
                    return;
                }

                let params = this.form;
                params.attend_user_id = this.attend_user_id;
                params.file_id_list = dealFormArrayData(this.form.file_id_arr);
                params.admin_id = require('store').get('people_info')[0].admin_id;
                params.activity_start_time = dealDateFormt(new Date(params.activity_start_time));
                params.activity_end_time = dealDateFormt(new Date(params.activity_end_time));
                params.dept_id = this.dept_id;
                console.log('submit--params--', params);
                submitData(this,params)

            }

        },
        mounted() {
            console.log('------->>>',this)
        }
    }
    function dealFormArrayData(arr) {
        let temp = '';
        if (arr instanceof Array) {
            arr.forEach(v => {
                temp += v + '|';
            });
        }
        return temp;
    }

    function dealDateFormt(d) {
        return d.Format('yyyy-MM-dd');
    }

    function submitData(vm, data) {
        let params = {};
        if (vm.parentForm == undefined) {
            params.url = `/activity_record/activity_record_add`;
            params.tips = '添加成功,2秒后跳转'
        } else {
            params.url = `/activity_record/activity_record_edit`;
            params.tips = '修改成功,2秒后关闭';
            params.activity_record_id = vm.parentForm.id;
        }
        params.activity_record_data = data;
        vm.$ajax.post(params.url, params).then(res => {
            if (res.data.errno == 0) {
                vm.$message({message: params.tips, type: 'success'});
                setTimeout(_ => {
                    if(vm.parentForm == undefined){
                        vm.$router.replace('/home/main');
                    }else{
                        vm.$emit('closeEditDialid');
                        window.location.reload();
                    }
                    vm.submitBtn = false;
                }, 2000);
            } else {
                vm.submitBtn = false;
                vm.$message({message: '操作失败,请重试', type: 'error'});
            }
        }).catch(err => {
            vm.submitBtn = false;
            vm.$message({message: '操作失败,请重试' + err.message, type: 'error'});
        })
    }

</script>

<style>
    .deptment_name .mint-field-core {
        font-size: 10px;
        height: 12px;
        line-height: 12px;
    }

    .mint-field-core {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #upload .mint-field-core{
        max-width: 0;
    }
</style>