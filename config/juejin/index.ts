import { IRule } from "../types";

export const juejinMatch = ["https://juejin.cn/post/*"]
export const juejinRules: IRule[] = [
    {
        url: "https?://juejin.cn/post/\\w+",
        name: "juejin",
        class: "#juejin > div.view-container > div, #juejin > div.view-container > main > div > div.article-suspended-panel.dynamic-data-ready,#juejin > div.view-container > main > div > div.main-area.article-area > div.wrap.category-course-recommend,#comment-box,#juejin > div.view-container > main > div > div.main-area.recommended-area.shadow,#juejin > div.view-container > main > div > div.recommended-links.main-area,#juejin > div.view-container > main > div > div.sidebar.sidebar,#juejin > div.global-component-box, #juejin > div.view-container > main > div > div.main-area.article-area > div.article-end > div.column-container,#juejin > div.view-container > main > div > div.main-area.article-area > div.article-end > div.extension-banner,#juejin > div.recommend-box,#juejin > div.view-container > main > div > div.main-area.article-area > div.action-box.action-bar",
        style: `@media print {
                article {
                    position: absolute; top: 0; left: 0;z-index: 999;
                    max-width: 1080px;
                    min-width: 1080px;
                    width: 1080px;
            }
        }`,
    },
]

