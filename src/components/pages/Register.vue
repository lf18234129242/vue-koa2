<template>
    <div>
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                icon="clear"
                placeholder="请输入密码"
                required
                @click-icon="password=''"
                :error-message="passwordErrorMsg"
            />
            <div class="register-button">
                <!-- <van-button type="primary" size="large" >马上注册</van-button> -->
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
    data(){
        return{
            username:'',
            password:'',
            openLoading:false,     //是否开启用户注册的loading状态
            usernameErrorMsg:'',    //当用户名出现错误时的提示信息
            passwordErrorMsg:'',    //当用户密码出现错误时的提示信息
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        registerAction(){
            // if(this.checkForm()){
            //     this.axiosRegisterUser()
            // }
            // 等价于上面的if判断
            this.checkForm() && this.axiosRegisterUser()
        },
        axiosRegisterUser(){
            this.openLoading = true;
            axios({
                url:url.registerUser,
                method:'post',
                data:{
                    userName:this.username,
                    password:this.password
                }
            })
            .then(res=>{
                console.log(res);
                if(res.data.code == 200){
                    Toast.success(res.data.message)
                    this.$router.push('/')
                }else{
                    Toast.fail('注册失败')
                    console.log(res.data.message);
                    this.openLoading = false;
                }
            })
            .catch(err=>{
                console.log(err);
                Toast.fail('注册失败')
                this.openLoading = false;
            })
        },
        //表当验证方法
        checkForm(){
            let isOK = true;
            if(this.username.length < 5){
                this.usernameErrorMsg = "用户名不能少于五位！"
                isOK = false;
            }else{
                this.usernameErrorMsg = ''
            }
            if(this.password.length < 6){
                this.passwordErrorMsg = "密码不能少于6位！"
                isOK = false;
            }else{
                this.passwordErrorMsg = ''
            }

            return isOK;
        }
    },
}
</script>

<style scoped>
.register-panel{
    width: 95%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
}
.register-button{
    margin-top: 10px;
}
</style>