import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");
//菜单展示路由
export const menuRouters: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    name: "首页",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/weChartManage",
    name: "WeChartManage",
    meta: {
      title: "小程序管理",
    },
    redirect: "/weChartManage/classification",
    children: [
      {
        path: "/weChartManage/classification",
        name: "Classification",
        component: () =>
          import("@/views/WeChartManage/classification/index.vue"),
        meta: {
          title: "分类管理",
        },
      },
      {
        path: "/weChartManage/scene",
        name: "Scene",
        component: () => import("@/views/WeChartManage/scene/index.vue"),
        meta: {
          title: "场景管理",
        },
      },
      {
        path: "/weChartManage/swiper",
        name: "Swiper",
        component: () => import("@/views/WeChartManage/swiper/index.vue"),
        meta: {
          title: "走马灯管理",
        },
      },
    ],
  },
];
//静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "登录页",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true, //菜单中隐藏
    },
  },
  {
    path: "/",
    name: "",
    component: Layout,
    redirect: "/dashboard",
    children: menuRouters,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  },
];
//创建路由
const router = createRouter({
  history: createWebHashHistory(), //Hash模式路由
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}
export default router;
