<!--子菜单组件-->
<template>
  <template v-for="item in menuList" :key="item.path">
    <!--包含子菜单时，展示子菜单-->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 0"
    >
      <template #title>{{ item.meta.title }}</template>
      <!--多层子菜单时，递归自身-->
      <menuItem :menu-list="item.children"></menuItem>
    </el-sub-menu>
    <!--不包含子菜单，直接展示-->
    <el-menu-item v-else :index="item.path">{{ item.meta.title }}</el-menu-item>
  </template>
</template>
<script lang="ts" setup>
defineProps(["menuList"]);
</script>
