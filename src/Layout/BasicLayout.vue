<template>
  <van-nav-bar
      fixed
      :title= "title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight">
    <template #right>
      <van-icon name="search"/>
    </template>
  </van-nav-bar>
  <div id="content">
      <router-view/>
  </div>
  <van-tabbar route active-color="#ee0a24" @change="onChange">
    <van-tabbar-item to = "/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to = "/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to = "/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup>
    import "../pages/Index.vue"
    import "../pages/Team.vue"
    import "../pages/SearchPage.vue"
    import { showToast } from 'vant';
    import {useRouter} from "vue-router";
    import routes from "../config/router.ts";
    import {ref} from "vue";
    const router = useRouter()
    const DEFAULT_T_TITLE = 'LC聚交馆';
    const title = ref(DEFAULT_T_TITLE)
    router.beforeEach((to, from) =>{
      const toPath = to.path;
      const route = routes.find((route) => {
        return toPath == route.path;
      })
      title.value = route?.title ?? DEFAULT_T_TITLE;
    })
    const onClickLeft = () => {
      router.back();
    }
    const onClickRight = () => {
      router.push('/search');
    }
</script>

<style scoped>
 #content{
   padding-bottom: 50px;
 }
</style>