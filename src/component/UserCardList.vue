<template>
  <div title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="`${user.username}`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px" >
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {CurrentUser} from "../models/user";

interface UserCardListProps{
  loading: boolean;
  userList: CurrentUser[];
}
// 给父组件设置默认值，保证数据不为空
const props= withDefaults(defineProps<UserCardListProps>(),{
  loading: true,
  userList: [] as CurrentUser[],
});

</script>
<style scoped>
/* 标签颜色*/
.van-tag--danger.van-tag--plain {
  color: #002fff;
}
</style>