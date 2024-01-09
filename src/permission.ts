import router from "@/router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // 进度条

// 白名单路由
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = localStorage.getItem("accessToken");
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，跳转首页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 未匹配到任何路由，跳转404
      if (to.matched.length === 0) {
        from.name ? next({ name: from.name }) : next("/404");
      } else {
        next();
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
