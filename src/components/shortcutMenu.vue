<template>
    <div id="shortcutMenu">
        <div class="cell" v-for="item in menus" :key="item.label" @click="cellBtn(item)">
            <button class="button button-box button-giant button-longshadow-left" :class="item.btnBg">
                <i class='fa' :class="item.icon"></i>
            </button>
            <p>{{item.label}}</p>
        </div>
    </div>
</template>
<script>
    import '../assets/style/buttons.css';
    import '../assets/style/shortcut-menu.less';
    export default {
        data() {
            return {
                menus: [
                    {
                        label: '通知公告', icon: 'fa-bullhorn', to: 'noticeList/notice_type/1', btnBg: 'button-action'
                    },
                    {
                        label: '每周学习', icon: 'fa-bookmark', to: 'noticeList/notice_type/2', btnBg: 'button-action'
                    },
                    {
                        label: '活动上传', icon: 'fa-list', to: 'recordList', btnBg: 'button-action'
                    },
                    {
                        label: '风采展示', icon: 'fa-list-alt', to: 'fengcaiList', btnBg: 'button-action'
                    },]
            }
        },
        methods: {
            cellBtn(item) {
                this.$router.push(item.to)
            }
        },
        mounted(){
            let $ = this.$jquery;
            let boxW = $('.cell').width();
            $('.box').css({height: boxW + 'px'})
        }
    }
</script>

