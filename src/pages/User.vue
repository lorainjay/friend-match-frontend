<template>
  <div style="height: 20px"></div>
  <template v-if="user">
    <van-image
        round
        width="8rem"
        height="8rem"
        style="margin-left: 120px;margin-bottom: 50px; margin-top: 40px;
        "
        src="https://ts1.cn.mm.bing.net/th/id/R-C.e701be5804570862077e8e10b27d51d5?rik=FqILmSGfSG5R5Q&riu=http%3a%2f%2finews.gtimg.com%2fnewsapp_match%2f0%2f15103659094%2f0&ehk=e5mtcBgeE%2fXLRmHpp5lj%2bYoeQvTfU8%2bVusN1PkxxYTM%3d&risl=&pid=ImgRaw&r=0"
    />
    <van-cell is-link
              @click="tagUpdate(user.tags,user.id,'tags')">
      <template #title>
        <span >我的标签</span>
      </template>
      <template #value>
        <van-tag v-for="tag in user.tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
    </van-cell>
    <van-cell title="昵称" icon="manager-o" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账户" icon="user-circle-o" :value="user.userAccount" />

    <van-cell title="性别" icon="like-o" is-link to="/user/edit" :value="user.gender==0?'男' : '女'" @click="toEdit('gender','性别',user.gender)" />
    <van-cell title="电话" icon="comment-o" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" icon="envelop-o" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="注册时间" :value="user.createTime"  />
    <van-space style="margin: 13px" direction="vertical" fill>
      <van-button type="primary" @click="loginOut" block>退出登录</van-button>
    </van-space>
  </template>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {getCurrentUser} from "../service/user";
import qs from "qs";
import {showFailToast, showSuccessToast} from "vant";

// const user = {
//   id : 9527,
//   username : 'shayu',
//   userAccount : '931',
//   avatarUrl : 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png',
//   gender : '男',
//   phone : '430821',
//   email : 'shayu-yusha@qq.com',
//   planetCode : '931',
//   createTime : new Date(),
// }
const user =ref();
const router = useRouter();

onMounted(async () =>{
    user.value = await getCurrentUser();
    user.value.tags = JSON.parse(user.value.tags)
})

const toEdit = (editKey: string,editName: string,currentValue: string) =>{
  router.push({
    path:'/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const tagUpdate = async  (tags: string, id: number) => {
  let user = await getCurrentUser()
  await router.push({
    path: "/search",
    query: {
      id: user.id,
      tags: user.tags,
    }
  })
}
const loginOut = async () => {
  let res = await myAxios.post("/user/logout");
  sessionStorage.clear();
  window.location.replace("/user")
  if (res?.code === 0) {
    showSuccessToast("退出成功")
    await router.replace("/user/login")
  } else {
    showFailToast("内部错误," + res?.data.message)
  }
}


</script>

<style scoped>

</style>