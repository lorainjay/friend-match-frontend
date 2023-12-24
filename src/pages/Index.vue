<template>
  <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      style="margin-bottom: 10px;margin-top: 40px;"
      text="校园有着你朗朗书声，有着你写不完的试卷，有着你忘不掉的老师，有着你共同学习的同学，在这里你可以尽情发挥你最好的水平。在这里可以找到志同道合的校友奋笔直追！！"
  />
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>

  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />

</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

import myAxios from "../plugins/myAxios.js";
import UserCardList from "../component/UserCardList.vue";
import {CurrentUser} from "../models/user";

const route = useRoute();
const {tags} = route.query;



const userList = ref([]);

const isMatchMode = ref<boolean>(false);
const loading = ref(true);

/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  //心动模式
  if (isMatchMode.value){
    const  num = 10;
    userListData = await myAxios.get('user/match',{
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed',response);
          showSuccessToast('心动模式');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/match error',error);
          showFailToast('请求失败');
        });
  }else {
    //普通用户使用分页查询
    userListData = await  myAxios.get('/user/recommend',{
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          showSuccessToast('普通模式');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommends error',error);
         showFailToast('请求失败');
        });

  }
  if (userListData){
    userListData.forEach((user: CurrentUser) =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() =>{
  loadData();
})



</script>
<style>
.van-toast{
  background: rgba(0, 0, 0, 0.7) !important;
}
</style>
<style scoped>
</style>