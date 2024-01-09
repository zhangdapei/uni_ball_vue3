<template>
  <el-breadcrumb separator="/">
    <!--非首页，显示首页跳转路径-->
    <el-breadcrumb-item to="/dashboard" v-if="$route.path != '/dashboard'"
      ><span class="title">首页</span></el-breadcrumb-item
    >
    <!--遍历matched获取当前页路径-->
    <template v-for="item in $route.matched">
      <el-breadcrumb-item v-if="item.name" :key="item.path" :to="item.path">
        <span class="title">{{ item.meta.title }}</span></el-breadcrumb-item
      >
    </template>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
const $route = useRoute();
</script>
<style lang="scss" scoped>
.title {
  font-weight: 400 !important;
}
</style>
