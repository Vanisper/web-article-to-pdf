import { IRule } from "../types";

export const bilibiliMatch = ["https://www.bilibili.com/read/cv*"]
export const bilibiliRules: IRule[] = [{
    url: "https?://www.bilibili.com/read/cv\\w+",
    name: "bilibili",
    class: "#bili-header-container, div.article-breadcrumb, div.right-side-bar.on.is-mini-page, #comment-wrapper, div.fixed-top-header,#readRecommendInfo, div.interaction-info",
    style: `@media print {
            #app > div > div.article-container {}
    }`,
}]
