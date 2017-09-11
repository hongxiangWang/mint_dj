<template>
    <div id="home">
        <mt-header :title="actionInfo.welcome_str" style="margin-bottom:0px">
            <router-link to="/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <div slot="right">
                <span v-if="actionInfo.is_login">
                    <mt-button @click='logout'><i class="fa fa-sign-out"></i> 退出</mt-button>
                </span>
                <span v-else="actionInfo.is_login">
                    <mt-button @click='signin'><i class="fa fa-sign-in"></i> 登陆</mt-button>
                </span>
            </div>
        </mt-header>

        <router-view ref="main" style="margin:10px 0px;"></router-view>

        <div id="bottom">
            <small>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-banquan"></use>
                </svg> &nbsp;&nbsp;中国电信新疆公司企业信息化部自主研发
            </small>
        </div>
    </div>
</template>
<script>
    import '../../assets/style/home.less';
    export default {
        data() {
            return {
                people_info:this.$localStore.get('people_info')
            }
        },
        computed:{
            actionInfo(){
                let welcome_str = '';
                let roleName='';
                let is_login = '';
                if(this.people_info!=null){
                    let user_info = this.people_info[0];
                    welcome_str = '欢迎您，'+user_info.people_name;
                    switch(user_info.role_id){
                        case 1:
                            roleName = '[超级管理员]';
                            break;
                        case 2:
                            roleName = '[党群管理员]';
                            break;
                        case 3:
                            roleName = '[党支部管理员]';
                            break;
                        default:
                            roleName = '未知';
                    }
                    welcome_str+=' '+roleName;
                    is_login = true;
                }else{
                    welcome_str = '管理员请登陆';
                    is_login = false;
                }
                return {welcome_str,is_login};
            }
        },
        methods:{
            signin(){
              this.$router.replace('/');
            },
            logout(){
                //localStorage清空
                this.$localStore.clearAll();
                this.$router.replace('/');
            }
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
                    vm.$router.replace('/');
                    return;
                }
                return res;
            }, function (err) {
                //Do something with response error
                return Promise.reject(err);
            });
        },
        mounted(){

        }
    }
</script>
