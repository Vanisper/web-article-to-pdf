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

(function () {
    'use strict';
    // ------------------------------------------
    // 构建遮罩层
    const mod = document.createElement('div');
    mod.setAttribute("style", "height:100vh;width:100vw;position: fixed;top: 0;left: 0;background-color: #8ae79d82;pointer-events: auto;z-index: 99999;");
    mod.setAttribute("class", "mod");
    //-------------------------------------------
    // 创建 loading 元素
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.position = 'fixed';
    loading.style.display = 'flex';
    loading.style.top = '0';
    loading.style.left = '0';
    loading.style.width = '100%';
    loading.style.height = '100%';
    loading.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loading.style.zIndex = '9999';
    // 创建 spinner 元素
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.margin = 'auto';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.borderRadius = '50%';
    spinner.style.border = '3px solid transparent';
    spinner.style.borderTopColor = '#fff';
    spinner.style.animation = 'spin 0.8s ease infinite';
    // 创建 keyframes
    const keyframes = document.createElement('style');
    keyframes.innerHTML = `@keyframes spin {to {transform: rotate(360deg);}}`;
    // 将 spinner 和 keyframes 添加到 loading 元素中
    loading.appendChild(spinner);
    document.head.appendChild(keyframes);
    // 显示 Loading
    function showLoading() {
        document.body.appendChild(loading);
    }
    // 隐藏 Loading
    function hideLoading() {
        document.body.removeChild(loading);
    }
    // ------------------------------------------
    // 将loading挂载到遮罩层上
    mod.appendChild(loading);
    // ------------------------------------------
    function preventDefault(e) {
        e.preventDefault();
    }
    // ------------------------------------------
    // 循环滚动
    function smoothScrollToBottom() {
        var scrollHeight = document.body.scrollHeight;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            // 到达底部，停止滚动
            mod.remove(); // 移除遮罩层
            window.removeEventListener('wheel', preventDefault, { passive: false }); // 恢复鼠标滚动事件
            window.print(); // 调用浏览器打印事件
            return;
        } else {
            // 滚动到下一页
            window.scrollTo({
                top: scrollTop + clientHeight,
                behavior: 'auto' // 可以设置成光滑的
            });
            // 延时执行，等待页面加载完成
            setTimeout(smoothScrollToBottom, 1000);
        }
    }
    // ------------------------------------------
    const urls = [{
        r: "https?://zhuanlan.zhihu.com/p/\\w+",
        n: "zhihu",
        s: "body",
        class: ".Catalog, .ColumnPageHeader-Wrapper, .RichContent-actions, .RichContent-actions, .Post-NormalSub, .Post-SideActions, .complementary, .CornerAnimayedFlex",
        style: `@media print {
                    article > div, article > header {
                        max-width: 1080px;
                        min-width: 1080px;
                        width: 1080px;
                    }
                }`,
    }, {
        r: "https?://blog\\.csdn\\.net/\\w+/article/details/\\w+",
        n: "csdn",
        s: "body",
        class: "#mainBox > aside, #csdn-toolbar, body > div:nth-child(49) > div, #toolBarBox,#mainBox > main > div.recommend-box, #recommendNps,#copyright-box, #treeSkill > div",
        style: `@media print {
                    #mainBox > main > div.blog-content-box{ position: absolute; top: 0; left: 0; max-width: 1080px; z-index: 999;}
                    main div.blog-content-box pre.set-code-hide { height: auto; overflow-y: auto; }
                    main div.blog-content-box pre.set-code-hide .hide-preCode-box { display: none; }
                    #article_content .markdown_views pre.prettyprint * { white-space: pre-wrap; word-break: break-word; word-wrap: normal; }
                }`,
    }, {
        r: "https?://juejin.cn/post/\\w+",
        n: "juejin",
        s: "body",
        class: "#juejin > div.view-container > div, #juejin > div.view-container > main > div > div.article-suspended-panel.dynamic-data-ready,#juejin > div.view-container > main > div > div.main-area.article-area > div.wrap.category-course-recommend,#comment-box,#juejin > div.view-container > main > div > div.main-area.recommended-area.shadow,#juejin > div.view-container > main > div > div.recommended-links.main-area,#juejin > div.view-container > main > div > div.sidebar.sidebar,#juejin > div.global-component-box, #juejin > div.view-container > main > div > div.main-area.article-area > div.article-end > div.column-container,#juejin > div.view-container > main > div > div.main-area.article-area > div.article-end > div.extension-banner,#juejin > div.recommend-box,#juejin > div.view-container > main > div > div.main-area.article-area > div.action-box.action-bar",
        style: `@media print {
                    article {
                        position: absolute; top: 0; left: 0;z-index: 999;
                        max-width: 1080px;
                        min-width: 1080px;
                        width: 1080px;
                    }
                }`,
    }, {
        r: "https?://www.jianshu.com/p/\\w+",
        n: "jianshu",
        s: "body",
        class: "#__next > header, #__next aside,#__next > div._3Pnjry, #__next > footer, #__next > div > div > div._gp-ck > section:nth-child(1) > div._13lIbp, #__next > div > div > div._gp-ck > section:nth-child(2), #__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(5),#note-page-comment",
        style: `@media print {
                    #__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(1) {
                        position: absolute; top: 0; left: 0;z-index: 999;
                        max-width: 1080px;
                        min-width: 1080px;
                        width: 1080px;
                    }
                }`,
    }, {
        r: "https?://www.bilibili.com/read/cv\\w+",
        n: "bilibili",
        s: "body",
        class: "#bili-header-container, div.article-breadcrumb, div.right-side-bar.on.is-mini-page, #comment-wrapper, div.fixed-top-header,#readRecommendInfo, div.interaction-info",
        style: `@media print {
                    #app > div > div.article-container {
                    }
                }`,
    }, {
        r: "https?://mp.weixin.qq.com/s(\\?|/)\\w+",
        n: "weixin",
        s: "body",
        class: "#js_base_container > div.rich_media_area_extra, #js_pc_qr_code",
        style: `@media print {
                }`,
    }, {
        r: "https?://www\\.cnblogs\\.com/\\w+/(p|archive)/\\w+",
        n: "cnblogs",
        s: "body",
        class: "#top_nav, #header, #sideBar,#blog_post_info,#post_next_prev,#topics > div > div.postDesc,#comment_form,#footer,#top_nav,#header,#mylinks,#mytopmenu,body > div.footer,#leftcontent,#blog_post_info_block,#comment_form",
        style: `@media print {
                    #main {
                        display: flex !important;
                    }
                    #mainContent {
                        max-width: 1080px!important;
                        min-width: 720px!important;
                        width: 100%!important;
                    }
                    #post_detail {
                        display: flex !important;
                        justify-content: center;
                    }
                }`,
    }, {
        r: "https?://segmentfault.com/a/\\w+",
        n: "segmentfault",
        s: "body",
        class: ".fix-bottom-action-wrap, nav, .right-side, .sticky-wrap, #comment-area, div.article-content div.card.mt-4",
        style: `@media print {
                    .fmt pre {max-height: unset !important;}
                }`,
        copyright: ""
    },];
    var currentUrl = window.location.href;
    var flag = false;
    var curr = { r: "", n: "", s: "", class: "", style: "" };
    // ------------------------------------------
    // 检测当前url是否是预设的
    urls.some((e, _i) => {
        var reg = new RegExp(e.r);
        if (reg.test(currentUrl)) {
            curr.r = currentUrl;
            curr.n = e.n;
            curr.s = e.s;
            curr.class = e.class;
            curr.style = e.style;
            flag = true;
            return true;
        }
    })
    if (flag) {
        var style = document.createElement('style');
        style.innerHTML = `@media print {${curr.class}, .mod, a.setpdf { display: none!important;} div.setpdf-copyright { display: block!important; }} ${curr.style}`;
        document.head.appendChild(style);
        window.addEventListener('load', function () {
            var dom = document.querySelector(curr.s);
            const btn = document.createElement("a");
            btn.appendChild(document.createTextNode("导出pdf"));
            btn.setAttribute('style', 'position: fixed;top: 50%;right: 200px;background: #fff;border: 1px solid;z-index:999;border-radius: 3px;cursor: pointer;display: inline-block;font-size: 14px;line-height: 32px;padding: 0 16px;text-align: center;color: blueviolet;');
            btn.setAttribute('class', "setpdf");
            dom.appendChild(btn);
            btn.onclick = () => {
                document.body.appendChild(mod);
                // 禁用滚动条的滚轮事件
                window.addEventListener('wheel', preventDefault, { passive: false });
                window.scrollTo(0, 0);
                smoothScrollToBottom();
            }

            // 添加版权信息
            const copyright = document.createElement("div");
            copyright.setAttribute('style', 'display:none');
            copyright.setAttribute('class', "setpdf-copyright");
            copyright.appendChild(document.createTextNode("来源："));
            const link = document.createElement('a');
            link.textContent = currentUrl;
            link.setAttribute('href', currentUrl);
            copyright.appendChild(link);
            dom.appendChild(copyright);
        });
        return;
    }

})();