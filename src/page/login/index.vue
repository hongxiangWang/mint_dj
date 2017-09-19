<template>
    <div>
        <el-row>
            <div class="login_pic">

            </div>
            <div class="login_form">
                <el-form :model="ruleForm2" ref="ruleForm2" label-width="0" label-position="left">
                        <mt-field label="用户名" placeholder="请输入登陆账号" v-model="ruleForm2.username"></mt-field>
                        <mt-field label="密码" placeholder="请输入管理密码" type="password" v-model="ruleForm2.userpwd"></mt-field>
                </el-form>
            </div>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="1">
                <mt-button size="large" type="primary" @click="submit('ruleForm2')">登录</mt-button>
            </el-col>
            <el-col :span="10" :offset="1">
                <mt-button size="large" :plain="true" type="default" @click="nextstep">跳过</mt-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol},
        data() {
            return {
                ruleForm2: {
                    username: '',
                    userpwd: ''
                },
            }
        },
        methods: {
            submit(formName){
                     this.$indicator.open({
                        text: '登陆中...',
                        spinnerType: 'fading-circle'
                    });

                    var that = this;
                    let valid = false;
                    let f_username = this.ruleForm2.username;
                    let f_userpwd = this.ruleForm2.userpwd;

                    if(f_username==''||f_userpwd==''){
                        valid=false;
                        this.$toast({message: '用户名密码不能为空', position: 'bottom', duration: 2500});
                        this.$nextTick(_=>{
                            this.$indicator.close();
                        })
                        return;
                    }else{
                        valid=true;
                    }
                    if (valid) {
                        let params = {
                            username: this.ruleForm2.username,
                            userpwd: this.ruleForm2.userpwd
                        }
                        this.$ajax.post('/admin/login', params).then(response => {
                            if (response.data.errno == 0) {
                                getAccount(this, response.data.data);
                                this.$indicator.close();
                                this.$toast({message: '登陆成功', position: 'bottom', duration: 800});
                                setTimeout(_=>{
                                    this.$router.replace('/main')
                                },500)
//
                            } else {
                                this.$indicator.close();
                                this.$toast({message: response.data.errmsg, position: 'bottom', duration: 2500});
                            }
                        }).catch(error => {
                            this.$indicator.close();
                            this.$toast({message: res.data.errmsg, position: 'bottom'});
                        });
                    } else {
                        this.$indicator.close();
                        return false;
                    }
            },
            nextstep(){
                this.$router.replace('/main');
            },
            is_login(){
                let token = this.$localStore.get('token');
                if (token) {
                    return true;
                }
                return false;
            }
        },
        computed:{

        },
    }
    function getAccount(vm, data) {
        vm.$localStore.set('token', data.token);
        vm.$localStore.set('people_info', data.people_info);
        vm.$localStore.set('user_access_list', data.user_access_list);
    }
</script>
<style>
    .login_pic {
        height: 240px;
        background: url("../../assets/images/djgb_m.png") no-repeat center center;
    }

    .login_form {
        padding: 10px 10px;
    }
</style>