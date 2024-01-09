<!--登录页-->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="font-size-6 font-black">{{ setting.title }}</div>
      <el-form
        :model="loginData"
        class="login-form"
        ref="loginFormRef"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginData.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginData.password"
            type="password"
            show-password
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        :loading="loading"
        type="primary"
        class="w-full"
        size="large"
        @click.prevent="handleLogin"
        >登录
      </el-button>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import setting from "@/setting";
import router from "@/router";
import { User, Lock } from "@element-plus/icons-vue";
// 状态管理依赖
import { useUserStore } from "@/store/modules/user";

const loginFormRef = ref(ElForm); // 登录表单ref
//登录按钮loading状态
const loading = ref(false);
//登录参数
const loginData = ref({
  username: "uni",
  password: "123",
});
//登录规则校验
const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: `请输入用户名`,
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: `请输入密码`,
      },
    ],
  };
});

//登录接口
const userStore = useUserStore();
const handleLogin = () => {
  loginFormRef.value.validate((valid: boolean) => {
    //登录校验
    if (valid) {
      loading.value = true;
      setTimeout(() => {
        if (
          loginData.value.username == "uni" &&
          loginData.value.password == "123"
        ) {
          userStore.login(loginData.value).then(() => {
            loading.value = false;
            //跳转到首页
            router.push({ path: "/dashboard" });
          });
        } else {
          ElMessage.error("用户名或密码错误");
          loading.value = false;
        }
      }, 500);
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/images/login-bg.jpg") no-repeat center right;
  .login-card {
    width: 400px;
    padding: 30px 20px;
    text-align: center;
    background: url("@/assets/images/login-bg.jpg") no-repeat center right;
    .login-form {
      padding: 30px 10px;
    }
  }
}
</style>
