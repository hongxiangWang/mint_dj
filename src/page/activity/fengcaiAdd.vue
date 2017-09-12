<template>
    <div>
        <div class="fengcai_add_box">
            <mt-field label="标题" placeholder="请输入风采展示标题" v-model="fengcai.title"></mt-field>
            <div class="fenge_bar"></div>
            <div class="file_upload_box">
                <VueImgInputer v-model="picValue" theme="light" size="large"></VueImgInputer>
            </div>
        </div>
    </div>
</template>

<script>
    import VueImgInputer from 'vue-img-inputer'
    export default {
        data () {
            return {
                fengcai:{
                    title:'',
                    admin_id:0
                },
                fengcai_pic:{
                    pic_url:'',
                    pic_content:''
                }
            }
        },
        methods: {},
        computed: {},
        created(){

        },
        mounted(){

        },
        components: {
            VueImgInputer
        }
    }
</script>
<style>
.fenge_bar{
    border-bottom:1px dashed lightsalmon;
    height:1px;
    display:block;
    margin:0px auto;
}
</style>