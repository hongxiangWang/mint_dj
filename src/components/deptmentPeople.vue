<template>
    <div id="tools">
        <el-row style="border-bottom: 1px solid #EEE">
            <el-col :span="12">
                <mt-button size="large" @click="cancel">取消</mt-button>
            </el-col>
            <el-col :span="12">
                <mt-button size="large" type="primary" @click="submit">确定</mt-button>
            </el-col>
        </el-row>
        <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="true"
                infinite-scroll-distance="10">
            <mt-cell title="全选">
                <mt-switch v-model="allSwitch" @change="switchChange"></mt-switch>
            </mt-cell>
            <mt-checklist
                    title="参会人员"
                    align="right"
                    v-model="value"
                    @change="checkList"
                    :options="list">
            </mt-checklist>
        </div>

        <div v-show="false">4444{{userList}}---->{{dept_id}}--------{{peopleList}}</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                value: [],
                allSwitch: false,
                peopleList: [],
                allPeopleData: '',
            }
        },
        props: {
            dept_id: Number
        },
        computed: {
            userList() {
                return getUersList(this)
            }
        },

        methods: {
            loadMore() {
                this.loading = true;
            },
            checkList(call) {
                //console.log('2222', call)
            },
            cancel() {
                this.$emit('cancel')
            },
            submit() {
                if (this.allChecked) {
                    this.$emit('submit', this.allPeopleData);
                } else {
                    let peoplelist = ''
                    let peopleNameList = '';
                    let vm = this;
                    this.value.forEach(v => {
                        peoplelist += v + "|";
                        vm.list.forEach(item => {
                            if (item.value == v) {
                                peopleNameList += item.label + "、"
                            }
                        })
                    });
                    console.log('peopleNameList---', peopleNameList);
                    this.$emit('submit', {label:peopleNameList,value:peoplelist});
                }

            },
            switchChange(call) {
                if (this.allSwitch) {
                    this.list.forEach(v => {
                        this.value.push(v.value)
                    })
                } else {
                    this.value = [];
                }
            }
        }

    }

    function getUersList(vm) {
        if (vm.dept_id == undefined) {
            return;
        }
        let params = {
            depart_id: vm.dept_id
        }
        vm.$ajax.post('/people/user_query', params).then(res => {
            if (res.data.errno == 0) {
                let arr = [];
                let valueArr = '';

                res.data.data.forEach(value => {
                    let json = {};
                    json.label = value.people_name;
                    json.value = value.id;
                    arr.push(json);
                    valueArr += value.id + '|';
                })
                vm.allPeopleData = valueArr;
               // arr.unshift({label: '全部', value: valueArr})
                vm.list = arr;

            } else {
                vm.$toast({
                    message: '失败，请重试',
                    position: 'bottom',
                    duration: 2500
                })
            }
        }).catch(err => {
            console.log('----', err)
        })
    }
</script>

<style>
    #tools .mint-button {
        border-radius: 0px;
    }

    .mint-checklist .mint-cell-title {
        width: 100%;
    }
</style>