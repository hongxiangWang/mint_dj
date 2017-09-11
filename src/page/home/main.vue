<template>
    <div>
        <mt-swipe :auto="5000">
            <mt-swipe-item class="slide1">1</mt-swipe-item>
            <mt-swipe-item class="slide2">2</mt-swipe-item>
            <mt-swipe-item class="slide3">3</mt-swipe-item>
        </mt-swipe>
        <div id="menu">
            <shortcut-menu></shortcut-menu>
        </div>
    </div>
</template>

<script>
    import shortcutMenu from  '../../components/shortcutMenu.vue';
    export default {
        data () {
            return {
                name: "123"
            }
        },
        components:{
            shortcutMenu
        },
    }
</script>
<style>

</style>