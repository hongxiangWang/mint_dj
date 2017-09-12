<template>
    <div>
        <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="true"
                infinite-scroll-distance="10">
            <mt-checklist
                    title="复选框列表"
                    v-model="value"
                    @change="checkList"
                    :options="list">
            </mt-checklist>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [{label: '111', value: 1}, {label: '222', value: 2}, {label: '33', value: 3}, {
                    label: '111',
                    value: 1
                }, {label: '222', value: 2}, {label: '33', value: 3}, {label: '111', value: 1}, {
                    label: '222',
                    value: 2
                }, {label: '33', value: 3}, {label: '111', value: 1}, {label: '222', value: 2}, {
                    label: '33',
                    value: 3
                }, {label: '111', value: 1}, {label: '222', value: 2}, {label: '33', value: 3}, {
                    label: '111',
                    value: 1
                }],
                value: []
            }
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <50; i++) {
                        this.list.push({label: '==='+i, value: i});
                    }
                    this.loading = false;
                }, 2500);
            },
            checkList(call) {
                console.log('2222', call)
            }
        }
    }
</script>