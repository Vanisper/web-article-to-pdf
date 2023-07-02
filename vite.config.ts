import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import { match } from "./config/rules";

export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: "文章导出成pdf",
        author: "Vanisper",
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'https://github.com/Vanisper/web-article-to-pdf',
        defaulticon: "将一些主流的网站的文章，去除掉一些无关部分直接启动浏览器自带打印功能",
        match: match,
        license: "MIT"
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
