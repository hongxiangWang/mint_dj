<template>
    <div>
        <mt-swipe :auto="5000">
            <mt-swipe-item class="slide1"></mt-swipe-item>
            <mt-swipe-item class="slide2"></mt-swipe-item>
            <mt-swipe-item class="slide3"></mt-swipe-item>
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

            }
        },
        components:{
            shortcutMenu
        },
    }
</script>
<style>

</style>