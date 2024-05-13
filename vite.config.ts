import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import autoprefixer from "autoprefixer";
import path from "path";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(mode);
  return {
    base: "./",
    publicDir: process.env.use_analyzer ? false : "public",
    plugins: [
      vue(),
      !process.env.use_analyzer
        ? dts({
            // 这里定义了需要生成d.ts文件的目录，如果有多个目录，可以使用数组
            include: ["src/components/**/*.{vue,ts}"],
          })
        : null,
      command !== "build" ? VueDevTools() : null,
      // 生产包分析
      command === "build" && process.env.use_analyzer
        ? visualizer({
            emitFile: true, //是否被触摸
            filename: "test.html", //生成分析网页文件名
            open: true, //在默认用户代理中打开生成的文件
            gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
            brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
          })
        : null
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            // 自动添加前缀
            overrideBrowserslist: [
              "> 1%",
              "last 2 versions", // 所有主流浏览器最近2个版本
              "not dead",
            ],
          }),
        ],
      },
    },
    esbuild: {
      drop: command === "build" ? ["console", "debugger"] : [], //移除console与debugger
    },
    build: process.env.use_analyzer
      ? {
          outDir: path.resolve(__dirname, "./docs"), //输出文件名称
          rollupOptions: {
            output: {
              chunkFileNames: "static/js/[name]-[hash].js",
              entryFileNames: "static/js/[name]-[hash].js",
              assetFileNames: "static/[ext]/[name]-[hash].[ext]",
            },
          },
        }
      : {
          outDir: path.resolve(__dirname, "./dist"), //输出文件名称
          lib: {
            entry: path.resolve(__dirname, "./src/components/checkbox-count/index.ts"), //指定组件编译入口文件
            name: "checkbox-count",
            fileName: "checkbox-count",
          }, //库编译模式配置
          rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            output: {
              // Named exports (命名导出)
              exports: "named",
              // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
              globals: {
                vue: "Vue",
              },
            },
            external: ["vue"],
          }, // rollup打包配置
        },
  };
});
