import { IRule } from "../types";

export const jianshuMatch = ["https://www.jianshu.com/p/*"]
export const jianshuRules: IRule[] = [{
    url: "https?://www.jianshu.com/p/\\w+",
    name: "jianshu",
    class: "#__next > header, #__next aside,#__next > div._3Pnjry, #__next > footer, #__next > div > div > div._gp-ck > section:nth-child(1) > div._13lIbp, #__next > div > div > div._gp-ck > section:nth-child(2), #__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(5),#note-page-comment",
    style: `@media print {
            #__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(1) {
                position: absolute; top: 0; left: 0;z-index: 999;
                max-width: 1080px;
                min-width: 1080px;
                width: 1080px;
        }
    }`,
},]
