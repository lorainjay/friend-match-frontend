<template>
  <div style="height: 45px"></div>
  <UserCardList :userList="userList" ></UserCardList>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />

</template>

<script setup>
  import {useRoute} from "vue-router";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.js";
  import {showFailToast, showSuccessToast, showToast} from "vant";
  import qs from 'qs';
  import UserCardList from "../component/UserCardList.vue";
  const route = useRoute();
  const {tags} = route.query;

  // const mockUser = ref({
  //   id: 1,
  //   userName: '卷王',
  //   userAccount: 'juanwang',
  //   profile: '卷王很懒,没有弄个人简介',
  //   gender: '男',
  //   phone: '564654654564',
  //   email: '324242342@qq.com',
  //   planetCode: '7897979',
  //   avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.5hFAvrfD9_wDyLSz_kwPAQHaHa?pid=ImgDet&rs=1',
  //   createTime: new Date().toDateString()
  // })
  const userList =ref([])
  onMounted(async () => {
    // Make a request for a user with a given ID
     const userListData = await myAxios.get('/user/search/tags',{
      params: {
        tagNameList: tags
      },
      // 主要是以下四行代码
      paramsSerializer:function(params){
        return qs.stringify(params, { indices: false})
      }
    })
        .then(function (response) {
          console.log('/user/search/tags succeed',response);
          showSuccessToast('查询成功');
          return response?.data;  //返回数据  ?.可选链操作符，避免数据为null或undefined时报错
        })
        .catch(function (error) {
          console.error('/user/search/tags error',error);
          showFailToast('查询失败');
        });
     if (userListData){
       userListData.forEach(user => {
         if(user.tags)
           user.tags = JSON.parse(user.tags)
       })
       userList.value = userListData

     }
  })
</script>

<style scoped>

</style>