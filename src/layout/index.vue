<template>
  <div class="layout_container">
    <!-- 左侧导航 -->
    <div class="layout_slider">
      <!--logo-->
      <Logo></Logo>
      <!-- 菜单 -->
      <Menu></Menu>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">
      <NavBar></NavBar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <!--引入element中文包-->
      <el-config-provider :locale="localeZH">
        <RouterView></RouterView>
      </el-config-provider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import localeZH from "element-plus/es/locale/lang/zh-cn";
import Logo from "./components/logo/index.vue";
import Menu from "./components/menu/index.vue";
import NavBar from "./components/navBar/index.vue";
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    border-bottom: 1px solid #ccc;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
