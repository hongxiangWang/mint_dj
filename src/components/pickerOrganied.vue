<template>
    <div class="page-picker" style="width: 100%">
        <div id="tools">
            <el-row style="border-bottom: 1px solid #EEE">
                <el-col :span="12">
                    <mt-button size="large" @click="cancel">取消</mt-button>
                </el-col>
                <el-col :span="12">
                    <mt-button size="large" type="primary" @click="submit">确定</mt-button>
                </el-col>
            </el-row>
        </div>
        <div class="page-picker-wrapper">
            <mt-picker
                    :slots="pickerSlots"
                    @change="pickerChange"
                    :visible-item-count="7"
                    :value-key="vk"></mt-picker>
        </div>
        <p><label>选择的是：</label><span style="color: orangered">{{pickerSeletVuale}}</span></p>
        <!--<p class="page-picker-desc">地址: {{ addressProvince }} {{ addressCity }}</p>-->

    </div>
</template>

<style>
    .picker {
    }

    .picker-item {
        /*top: -18px*/
    }
    #tools .mint-button{
        border-radius:0px ;
    }
</style>

<script type="text/babel">
    export default {
        methods: {
            pickerChange(picker, values) {
                if (this.oData.length > 0) {
                    picker.setSlotValues(1, values[0].children);
                    if (values[1] != undefined && values[1].children != undefined) {
                        picker.setSlotValues(2, values[1].children);
                    } else if (values[1] != undefined) {
                        picker.setSlotValues(2, []);
                    }
                }
                this.pickerSeletVuale = '';
                values.forEach(v => {
                    if (v != undefined) {
                        this.pickerSeletVuale += v.dept_name + " ";
                        this.pickerSubmit = v.id;
                    }

                })


            },
            cancel(){
                this.$emit('cancel');
            },
            submit(){
                this.$emit('submit',);
            }
        },

        data() {
            return {
                vk: 'dept_name',
                pickerSlots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot4',
                        textAlign: 'center'
                    }
                ],
                pickerSeletVuale: '',
                oData: {},
                pickerSubmit:''
            };
        },

        mounted() {
            this.$ajax.post('/department/dept_list_to_tree', {}).then(res => {
                let groupArr = [];
                if (res.data.errno == 0) {
                    if (res.data.data.length == 1 && res.data.data[0].id != 1) {
                        if (res.data.data[0].children == undefined) {
                            this.oData = res.data.data;
                            this.oData.forEach((v, i) => {
                                //v.dept_name = v.dept_name.substr(v.dept_name.length-7);
                                v.index = i;
                                v.value = v.id;
                            })
                            this.pickerSlots[0].values = this.oData;
                            this.$store.commit('ORGANIZED_CASCADER_DATA', res.data.data);
                            return;
                        }
                        let parent = res.data.data[0];
                        let json = {};
                        json.label = parent.dept_name;
                        json.value = parent.id;
                        groupArr.push(json);
                        this.oData = res.data.data;
                        this.oData.forEach((v, i) => {
                            //v.dept_name = v.dept_name.substr(v.dept_name.length-7);
                            v.index = i;
                            v.value = v.id;
                        })
                        this.pickerSlots[0].values = this.oData;
                        this.$store.commit('ORGANIZED_CASCADER_DATA', res.data.data);
                    } else {
                        console.log('000000---', res.data)
                        res.data.data[0].children.forEach(value => {
                            let json = {};
                            json.label = value.dept_name;
                            json.value = Number(value.id);
                            groupArr.push(json);
                        });
                        this.oData = res.data.data[0].children;
                        this.oData.forEach((v, i) => {
                            //v.dept_name = v.dept_name.substr(v.dept_name.length-7);
                            v.index = i;
                            v.value = v.id;
                        })
                        this.pickerSlots[0].values = this.oData;
                        this.$store.commit('ORGANIZED_CASCADER_DATA', res.data.data[0].children);
                    }
                    this.$store.commit('ORGANIZED_PARTY', groupArr);
                    return;
                }
                this.$message({message: '数据获取失败,请重试111', type: 'error'})
                console.log('res------', res.data)
            }).catch(err => {
                this.$message({message: '数据获取失败,请重试222', type: 'error'})
                console.log('err------', err)
            })

        }
    };
</script>