<template>
    <div style="padding: 10px">
        <br>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.userpwd"></mt-field>
        <br>
        <mt-button size="large" type="primary" @click="submit">登录</mt-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form:{
                    username:'',
                    userpwd:''
                }
            }
        },
        methods:{
            submit(){
                this.$ajax.post('/admin/login',this.form).then(res=>{
                    console.log('=====res==',res.data);
                    if(res.data.errno == 0){
                        getAccount(this,res.data.data);
                        this.$router.replace('/home')
                    }else {
                        this.$toast({message:res.data.errmsg,position: 'bottom'});
                    }
                }).catch(err=>{
                    this.$toast({message:err.message,position: 'bottom'});
                    console.log('=====err==',err);
                })
            }

        }
    }
    function getAccount(vm, data) {
        vm.$localStore.set('token', data.token);
        vm.$localStore.set('people_info', data.people_info);
        vm.$localStore.set('user_access_list', data.user_access_list);
    }
</script>