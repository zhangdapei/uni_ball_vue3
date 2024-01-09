<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img src="@/assets/images/logo.png" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import setting from "@/setting";
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    font-weight: 600;
    margin-left: 10px;
  }
}
</style>
