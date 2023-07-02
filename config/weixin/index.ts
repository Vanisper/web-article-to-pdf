import { IRule } from "../types";

export const weixinMatch = ["https://mp.weixin.qq.com/s/*", "https://mp.weixin.qq.com/s?*"]
export const weixinRules: IRule[] = [
    {
        url: "https?://mp.weixin.qq.com/s(\\?|/)\\w+",
        name: "weixin",
        class: "#js_base_container > div.rich_media_area_extra, #js_pc_qr_code",
        style: `@media print {}`,
    },
]

