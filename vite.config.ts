import { type ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import unocss from "unocss/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";

const pathSrc = resolve(__dirname, "src");

export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    base: './', // 在开发或生产中使用的基本公共路径。
    plugins: [
      vue(),
      unocss(),
      AutoImport({
        // 自动导入 Vue vue-router pinia 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        //自动导入vue使用, 生成 `auto-import.d.ts` 全局声明（ts项目添加上）
        vueTemplate: true,
        dts: resolve(pathSrc, "typings", "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        // 配置文件位置 (false:关闭自动生成)
        dts: false,
        // dts: resolve(pathSrc, "typings", "components.d.ts"),
      }),
      Icons({
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        ignore: /^\_/, //忽略开始_路径
        mockPath: "mock", //mock文件路径，在根路径下创建一个mock文件
        enable: mode === "development",
      }),
    ],
    resolve: {
      //路径别名
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
        },
      },
    },
    server: { 
      host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址
      port: 9527, // 指定开发服务器端口
      strictPort: true, // 若端口已被占用则会直接退出
      open: false, // 启动时自动在浏览器中打开应用程序
      proxy: {
        '/api': {
          // target: 'http://127.0.0.1:8080',//目标服务器地址
          target: 'https://www.uniball6.online',//目标服务器地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    build: {
      outDir: 'uniBill-dist', // 生成输出的根目录。如果该目录存在，则会在生成之前将其删除。 默认文件夹名称为dist
      target: 'esnext',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去掉控制台 console
          drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
          dead_code: true, // 删除无法访问的代码 默认就是true
        }
      },
      chunkSizeWarningLimit: 2000, // 调整区块大小警告限制
    }
  }
});
