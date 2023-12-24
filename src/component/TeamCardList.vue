<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :thumb="mouse"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary"  v-if="team.userId !== currentUser?.id && !team.hasJoin"  plain
                    @click="preJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small"
                    plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button size="small"   v-if="team.userId !== currentUser?.id && team.hasJoin"
                    plain @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small"  type="danger" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>

      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import mouse from '../assets/ikun.jpg';
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, showToast} from "vant";

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const router = useRouter();
const currentUser = ref();

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showSuccessToast('加入成功');
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
  window.location.replace("/team")
}
onMounted(async ()=>{
  currentUser.value = await  getCurrentUser();
})

const doUpdateTeam = (id:number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
  window.location.replace("/team")
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res.code === 0) {
    showToast('操作成功');
  } else {
    showToast('操作失败' + (res?.data.description ? `，${res?.data.description}` : ''));
  }
  window.location.replace("/team")
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    showToast('操作成功');
  } else {
    showToast('操作失败' + (res.description ? `，${res.data.description}` : ''));
  }
  window.location.replace("/team")
}



const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);

/**
 * 判断是不是加密房间，是的话显示密码框
 * @param team
 */
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}


</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>