<template>
    <div>

        <mt-field label="活动类型："  type="text" disabled="disabled"  v-model="type_name">
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
        <mt-field label="活动类型："  type="text" disabled="disabled"  v-model="type_name">
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
        <mt-field label="参会人员："  type="text" disabled="disabled"  v-model="type_name">
            <mt-button @click="attendList" size="small" type="primary">点击选择</mt-button>
            <mt-popup
                    style="width: 90%;margin-bottom: 30px"
                    v-model="popupVisible"
                    position="bottom">
                <deptmentpeople style="height:700px;overflow: scroll;margin-bottom: 5px"></deptmentpeople>
            </mt-popup>
        </mt-field>
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
                    start_time:'',
                    activity_start_time: new Date(),
                    end_time:'',
                    activity_end_time: '',
                    attend_user_arr: [],
                    record_host_people: '',
                    record_write_people: '',
                    activity_place: '',
                    record_subtitle: '',
                    record_content: '',
                    file_id_arr: []
                },
                type_name:'',
                popupVisible:false,
                organiedPopup:false,
            }
        },
        components:{deptmentpeople,organiedPopup},
        methods: {
            typeSelect() {
                this.sheetVisible = true;
            },
            sheetClick(call) {
                this.form.record_type = call.id;
                this.type_name = call.name;
            },
            startData(){
                this.$refs.startPicker.open();
            },
            endData(){
                this.$refs.endPicker.open();
            },
            startDateChange(call){
                this.form.start_time = call.Format('yyyy-MM-dd') ;
            },
            endDateChange(call){
                this.form.end_time = call.Format('yyyy-MM-dd') ;
            },
            attendList(){
                this.popupVisible = true;
            },
            organiedSelect(){
                this.organiedPopup = true;
            },
            pickCancel(){
                this.organiedPopup = false;
            },
            pickerSubmit(call){
                this.organiedPopup = false;
            }

        },
        mounted() {

        }
    }

</script>