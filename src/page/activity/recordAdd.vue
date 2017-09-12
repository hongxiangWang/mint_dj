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
                    v-model="form.activity_start_time">
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
        <mt-field label="活动内容：" placeholder="请输入" v-model="form.record_content"></mt-field>
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
                    dept_id: '',
                    record_title: '',
                    record_type: '',
                    start_time: '',
                    activity_start_time: new Date(),
                    end_time: '',
                    activity_end_time: '',
                    attend_user_arr: [],
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
                dialogImageUrl:''
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
                if(dept_id==0){
                    this.$toast({message: '请选择党支部', position: 'bottom', duration: 2500});
                    return;
                }
                if(this.form.record_type==''){
                    this.$toast({message: '请选择党支部', position: 'bottom', duration: 2500});
                    return;
                }

            }

        },
        mounted() {
            console.log('------->>>',this)
        }
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