import { IRule } from "../types";

export const segmentfaultMatch = ["https://segmentfault.com/a/*"]
export const segmentfaultRules: IRule[] = [
    {
        url: "https?://segmentfault.com/a/\\w+",
        name: "segmentfault",
        class: ".fix-bottom-action-wrap, nav, .right-side, .sticky-wrap, #comment-area, div.article-content div.card.mt-4",
        style: `@media print {
                .fmt pre {max-height: unset !important;
            }
        }`,
        copyright: ""
    },
]

