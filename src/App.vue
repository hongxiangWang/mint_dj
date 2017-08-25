<template>
    <div id="app">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="外卖">
                <img slot="icon" src="./assets/logo.png">
                外卖
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="./assets/logo.png">
                订单
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="./assets/logo.png">
                发现
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="./assets/logo.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                selected:''
            }
        },
        methods: {

        },
        components: {

        },
        mounted() {
        }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
</style>
