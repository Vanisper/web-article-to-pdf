import { IRule } from "../types";

export const csdnMatch = ["https://blog.csdn.net/*/article/details/*"]
export const csdnRules: IRule[] = [
    {
        url: "https?://blog\\.csdn\\.net/\\w+/article/details/\\w+",
        name: "csdn",
        class: "#mainBox > aside, #toolbarBox #csdn-toolbar, body > div:nth-child(49) > div, #toolBarBox, #mainBox > main > div.recommend-box, #recommendNps, #copyright-box, #treeSkill > div, .csdn-side-toolbar, .left-toolbox",
        style: `
        @media print {
            #mainBox > main > div.blog-content-box {
                position: absolute; top: 0; left: 0; max-width: 1080px; z-index: 999;
            }
            main div.blog-content-box pre.set-code-hide {
                height: auto; overflow-y: auto;
            }
            main div.blog-content-box pre.set-code-hide .hide-preCode-box {
                display: none;
            }
            #article_content .markdown_views pre.prettyprint * {
                white-space: pre-wrap; word-break: break-word; word-wrap: normal;
            }
            #toolBarBox, #csdn-toolbar, .recommend-right, .recommend-right1, .blog_container_aside {
                display: none !important;
            }
        }`,
        copyrightTarget: ".blog-content-box"
    },
]
