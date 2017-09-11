<template>
    <div id="home">
        <!--<label>-->
            <!--<svg class="icon" aria-hidden="true" style="font-size: 2rem">-->
                <!--<use xlink:href="#icon-party"></use>-->
            <!--</svg>-->

        <!--</label>-->
        <mt-swipe :auto="5000">
            <mt-swipe-item class="slide1">1</mt-swipe-item>
            <mt-swipe-item class="slide2">2</mt-swipe-item>
            <mt-swipe-item class="slide3">3</mt-swipe-item>
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
        created() {
            let vm = this;
            this.$ajax.interceptors.request.use(function (config) {
                //在请求发出之前进行一些操作
                let token = vm.$localStore.get('token');
                if (token) {
                    config.headers.token = token;
                }else {

                }
                return config;
            }, function (err) {
                //Do something with request error
                return Promise.reject(err);
            });

            this.$ajax.interceptors.response.use(function (res) {
                //在这里对返回的数据进行处理
                if (Number(res.data.errno) == 1000) {
                    vm.$router.replace('/')
                    return;
                }
                return res;
            }, function (err) {
                //Do something with response error
                return Promise.reject(err);
            })
        },
    }
</script>
