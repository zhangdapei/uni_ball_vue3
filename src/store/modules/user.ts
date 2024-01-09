import { defineStore } from "pinia";
import { resetRouter } from "@/router";

//引入路由(常量路由)
import { menuRouters } from "@/router/index";
import { store } from "@/store";
import { loginApi } from "@/api/auth";
import { LoginData } from "@/api/auth/types";

export const useUserStore = defineStore("user", () => {
  const user = {
    menuRoutes: menuRouters, //仓库存储生成菜单需要数组(路由)
  };

  const token = useStorage("accessToken", "");

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data;
          token.value = tokenType + " " + accessToken; // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  function logout() {
    return new Promise<void>((resolve, reject) => {
      token.value = "";
      location.reload(); // 清空路由
      resolve();
    });
  }
  // 清除 token
  function resetToken() {
    return new Promise<void>((resolve) => {
      token.value = "";
      resetRouter();
      resolve();
    });
  }
  return {
    token,
    user,
    login,
    resetToken,
    logout,
  };
});
// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
