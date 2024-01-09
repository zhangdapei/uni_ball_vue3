<!--头部tabbar-->
<template>
  <div class="tabbar">
    <!--面包屑-->
    <bread-crumb></bread-crumb>
    <!--右侧头像操作-->
    <nav-right></nav-right>
  </div>
</template>
<script lang="ts" setup>
import BreadCrumb from "./breadcrumb.vue";
import NavRight from "./navRight.vue";
</script>
<style lang="scss">
.tabbar {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
