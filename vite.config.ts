import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
// ==UserScript==
// @name         文章导出成pdf
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  将一些主流的网站的文章，去除掉一些无关部分直接启动浏览器自带打印功能
// @author       Vanisper
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://blog.csdn.net/*/article/details/*
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://mp.weixin.qq.com/s/*
// @match        https://mp.weixin.qq.com/s?*
// @match        https://www.cnblogs.com/*/p/*
// @match        https://www.cnblogs.com/*/archive/*
// @match        https://segmentfault.com/a/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @require      https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
// @grant        none
// @license MIT
// ==/UserScript==

export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: "文章导出成pdf",
        author: "Vanisper",
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'http://tampermonkey.net/',
        defaulticon: "将一些主流的网站的文章，去除掉一些无关部分直接启动浏览器自带打印功能",
        match: ['https://www.bilibili.com/video/*', "https://www.google.com/"],
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
