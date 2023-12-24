<template>
  <div id="login">
    <van-row justify="center">
      <van-image
          width="343"
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
      <van-field
          v-model="checkPassword"
          type="password"
          name="userPassword"
          label="再次输入密码"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
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
const checkPassword = ref('');
const route = useRoute();
const onSubmit = async () => {
  const res = await myAxios.post("/user/register",{
    userAccount:  userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value
  });
  if(res.code == 0 && res.data != null){
    showSuccessToast("注册成功")
    const redirectUrl = route.query?.redirect??'/user/login';
    window.location.href = redirectUrl;
  }else{
    showToast("注册失败");
  }
};
</script>

<style scoped>

#login {
  margin-top: 15px;
  margin-bottom: 20px;

  width: 100px;
  height: 100px;
  margin-left: 125px;
}
</style>