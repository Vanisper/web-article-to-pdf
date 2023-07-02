import { IRule } from "../types";
export const cnblogsMatch = ["https://www.cnblogs.com/*/p/*", "https://www.cnblogs.com/*/archive/*"]
export const cnblogsRules: IRule[] = [
    {
        url: "https?://www\\.cnblogs\\.com/\\w+/(p|archive)/\\w+",
        name: "cnblogs",
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
    },
]

