<!--菜单组件-->
<template>
  <!-- 滚动组件 -->
  <el-scrollbar class="scrollbar">
    <!-- 菜单组件-->
    <el-menu
      router
      :default-active="$route.path"
      background-color="#001529"
      text-color="white"
    >
      <menu-item :menu-list="userStore.user.menuRoutes"></menu-item>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import menuItem from "./menuItem.vue";
import { useRoute } from "vue-router";
//获取用户相关仓库
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const $route = useRoute();
</script>

<style lang="scss" scoped>
.scrollbar {
  width: 100%;
  height: calc(100vh - $base-menu-logo-height);

  .el-menu {
    border-right: none;
  }
}
</style>
