<template>
    <div id="app">
        <router-link class="page-back" v-if="visible" :to="'/'">
            <i class="mintui mintui-back"></i>
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                selected: ''
            }
        },
        methods: {},
        components: {},
        mounted() {
        },
        computed: {
            visible() {
                //return ['/', '/header', '/search'].indexOf(this.$route.path) < 0;
                return false;
            }
        }
    }
</script>

<style >
    body {
        font-family: Helvetica, sans-serif;
        padding: 0;
        margin: 0 auto;
        background: #fbf6ef;
    }

    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    a {
        color: inherit;
        font-style: normal;
        text-decoration:none;
    }

    .page-back {
        display: inline-block;
        position: absolute 12px * * 10px;
        width: 40px;
        height: 40px;
        text-align: center;

    i {
        font-size: 24px;
        line-height: 40px;
    }

    }
</style>
