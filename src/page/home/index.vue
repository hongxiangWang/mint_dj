<template>
    <div id="home">
        <!--<label>-->
            <!--<svg class="icon" aria-hidden="true" style="font-size: 2rem">-->
                <!--<use xlink:href="#icon-party"></use>-->
            <!--</svg>-->

        <!--</label>-->
        <mt-swipe :auto="5000">
            <mt-swipe-item class="slide1">1</mt-swipe-item>
            <!--<mt-swipe-item class="slide2">2</mt-swipe-item>-->
            <!--<mt-swipe-item class="slide3">3</mt-swipe-item>-->
        </mt-swipe>

        <div id="meun">
            <shortcut-meun></shortcut-meun>
        </div>

    </div>

</template>
<script>
    import shortcutMeun from  '../../components/shortcutMeun.vue'
    import '../../assets/style/home.less'
    export default {
        data() {
            return {
                msg: '这是菜单'
            }
        },
        methods:{

        },
        components:{
            shortcutMeun
        },
        mounted(){
            let $ = this.$jquery;
            let boxW = $('.box').width();
            $('.box').css({height:boxW+'px'})
        }
    }
</script>
