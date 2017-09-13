<template>
    <div id="shortcutMenu">
        <div class="cell" v-for="item in menus" :key="item.label" @click="cellBtn(item)">
            <!--<button class="button button-box button-giant  button-3d" :class="item.btnBg">-->
            <!--<i class='fa' :class="item.icon"></i>-->
            <!--</button>-->
            <span class="button-wrap">
                <button class="button button-circle  " :class="item.btnBg">
                  <!--<i class='fa' :class="item.icon"></i>-->
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="item.icon"></use>
                    </svg>
                </button>
            </span>
            <p>{{item.label}}</p>
        </div>
    </div>
</template>
<script>
    import '../assets/style/buttons.css';
    import '../assets/style/shortcut-menu.less';
    import '../assets/font/iconfont2';

    export default {
        data() {
            return {
                menus: [
                    {
                        label: '通知公告', icon: '#icon-dangjiannotice', to: 'noticeList/notice_type/1', btnBg: 'orange'
                    },
                    {
                        label: '每周学习', icon: '#icon-dangjianxuexi', to: 'noticeList/notice_type/2', btnBg: 'blue'
                    },
                    {
                        label: '党建活动', icon: '#icon-dangjianfengcai', to: 'recordList', btnBg: 'purple'
                    },
                    {
                        label: '风采展示', icon: '#icon-dangjianhuodong', to: 'fengcaiList', btnBg: 'green'
                    },]
            }
        },
        methods: {
            cellBtn(item) {
                if(item.label=='党建活动'){
                    if(require('store').get('token') ==null){
                        this.$toast({message:'请管理员先登录',position: 'bottom', duration: 2500});
                        return;
                    }
                }
                this.$router.push(item.to)
            },
            isShow(item){

            }
        },

        mounted() {
            let $ = this.$jquery;
            let boxW = $('.cell').width();
            $('.box').css({height: boxW + 'px'})
        }
    }
</script>
<style>


</style>

