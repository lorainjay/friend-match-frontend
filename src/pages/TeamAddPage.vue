<!--
User:Shier
CreateTime:19:54
-->
<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请输入队伍名称' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <!--过期时间-->
        <van-field
            is-link
            readonly
            name="datePicker"
            label="时间选择"
            :placeholder="addTeamData.expireTime ?? '点击选择关闭队伍加入的时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              @cancel="showPicker = false"
              type="datetime"
              title="请选择关闭队伍加入的时间"
              :min-date="minDate"/>
        </van-popup>

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import moment from 'moment';
import {showToast} from "vant";

const router = useRouter();


// 日期展示器
const showPicker = ref(false);
// 当前时间
const minDate = new Date();

const onConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 5,
  "password": "",
  "status": 0,
}

// 需要用户填写的表单数据 对象扩展
const addTeamData = ref({...initFormData})

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    expireTime: moment(addTeamData.value.expireTime).format("YYYY-MM-DD HH:mm:ss")
  }
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showToast('添加成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    showToast('添加失败');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>