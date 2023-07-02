import { IRule } from "../types";

export const zhihuMatch = ["https://zhuanlan.zhihu.com/p/*"]
export const zhihuRules: IRule[] = [
    {
        url: "https?://zhuanlan.zhihu.com/p/\\w+",
        name: "zhihu",
        class: ".Catalog, .ColumnPageHeader-Wrapper, .RichContent-actions, .RichContent-actions, .Post-NormalSub, .Post-SideActions, .complementary, .CornerAnimayedFlex",
        style: `@media print {
                article > div, article > header {
                    max-width: 1080px;
                    min-width: 1080px;
                    width: 1080px;
            }
        }`,
    }
]
