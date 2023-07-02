import { IRule } from "./types";
//==============================
import { bilibiliMatch, bilibiliRules } from "./bilibili";
import { cnblogsMatch, cnblogsRules } from "./cnblogs";
import { csdnMatch, csdnRules } from "./csdn";
import { jianshuMatch, jianshuRules } from "./jianshu";
import { juejinMatch, juejinRules } from "./juejin";
import { segmentfaultMatch, segmentfaultRules } from "./segmentfault";
import { weixinMatch, weixinRules } from "./weixin";
import { zhihuMatch, zhihuRules } from "./zhihu";
//==============================

export const rules: IRule[] = [
    ...bilibiliRules,
    ...cnblogsRules,
    ...csdnRules,
    ...jianshuRules,
    ...juejinRules,
    ...segmentfaultRules,
    ...weixinRules,
    ...zhihuRules,
]

export const match = [
    ...bilibiliMatch,
    ...cnblogsMatch,
    ...csdnMatch,
    ...jianshuMatch,
    ...juejinMatch,
    ...segmentfaultMatch,
    ...weixinMatch,
    ...zhihuMatch
]