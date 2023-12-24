<template>
<div>
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public" />
    <van-tab title="加密" name="private" />
  </van-tabs>
  <van-button class= "add-button" icon="plus" type="primary" @click = "toAddTeam"/>
  <team-card-list :team-list = "teamList"/>
  <van-empty v-if="teamList?.length < 1" description="数据为空" />
</div>

</template>

<script setup>

  import {useRouter} from "vue-router"
  import TeamCardList from "../component/TeamCardList.vue"
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.js";
  import {showFailToast, showToast} from "vant";
  const router = useRouter();

  const searchText = ref('');
  //跳转导队伍加入页面
  const toAddTeam = () => {
    router.push({
      path:"/team/add"
    })
  }

  const teamList = ref([])
  onMounted(async ()=> {
    const res = await myAxios.get("/team/list");
    if(res?.code === 0){
      teamList.value = res.data;
    }else{
      showFailToast("队伍加载失败,请刷新重试");
    }
  })

  /**
   * 搜索队伍
   * @param val
   * @returns {Promise<void>}
   */
  const listTeam = async (val = '', status=0) => {
    const res = await myAxios.get("/team/list", {
      params: {
        searchText: val,
        pageNum: 1,
        status
      },
    });
    if (res?.code === 0) {
      teamList.value = res.data;
    } else {
      showFailToast('加载队伍失败，请刷新重试');
    }
  }
  onMounted( async () => {
    await listTeam();
  })
  const onSearch = (val) => {
    listTeam(val);
  }
  const onTabChange = (name) => {
    //查公开
    if(name === 'public'){
      listTeam(searchText.value, 0);

    }else {
      // 查加密
      listTeam(searchText.value, 2);
    }
  }


</script>

<style scoped>

.add-button {
  position: fixed;
  bottom: 52px;
  width: 50px;
  right: 12px;
  height: 50px;
  border-radius: 50%;
  z-index: 999;
}
</style>