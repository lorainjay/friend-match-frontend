<template>
  <div style="height: 50px"></div>
  <div id="login">
    <van-row justify="center">
      <van-image
          round
          width="500"
          :src= "ikun"
          style="background-position:center"
      />


    </van-row>
  </div>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="forgetPassword">忘记密码</div>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <div style="margin: 16px;">
    <van-button round block type="primary" @click="register" style="background-color: #747bff">
      注册
    </van-button>
  </div>
</template>

<script setup>
    import {ref} from "vue";
    import myAxios from "../plugins/myAxios.js";
    import {useRouter} from "vue-router"
    import {useRoute} from "vue-router"
    import ikun from "../assets/ikun.jpg"
    const router = useRouter();
    import {showSuccessToast, showToast} from "vant";

    const userAccount = ref('');
    const userPassword = ref('');
    const route = useRoute();
    const register = function (){
      router.push({
        path: '/user/register'
      })
    }
    const onSubmit = async () => {
      const res = await myAxios.post("/user/login",{
        userAccount:  userAccount.value,
        userPassword: userPassword.value
      });
      if(res.code == 0 && res.data != null){
        showSuccessToast("登录成功")
        const redirectUrl = route.query?.redirect??'/';
        window.location.href = redirectUrl;
      }else{
        showToast("登录失败");
      }
    };
</script>

<style scoped>
.forgetPassword{
  font-size: 15px;
  color: #1989fa;
  margin-left: 270px;
}
#login {
  margin-top: 15px;
  margin-bottom: 20px;

  width: 100px;
  height: 100px;
  margin-left: 125px;
}
</style>