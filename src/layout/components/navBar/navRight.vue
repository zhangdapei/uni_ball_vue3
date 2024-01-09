<template>
  <div class="avatar">
    <el-dropdown trigger="click">
      <div class="avatar-container">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <i-ep-caret-bottom class="w-3 h-3" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const $router = useRouter();
const userStore = useUserStore();

const logout = () => {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore.logout().then(() => {
      $router.push(`/login`);
    });
  });
};
</script>
<style lang="scss">
.avatar {
  &-container {
    display: flex;
    place-items: center center;
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
