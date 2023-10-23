export interface IRule {
    /** 匹配的url */
    url: string
    /** 网站的名称 */
    name: string
    /** 需要加入 打印模式的强制`display: none`的css选择器 TODO:将变更为数组的类型*/
    class: string
    /** 需要直接塞进页面中的自定义样式 */
    style: string
    /** 需要在pdf最下面显示的版权信息  默认为文章来源 */
    copyright?: string
    copyrightTarget?: string;
    /** 自定义js脚本命令 */
    javascript?: Function
    /** 是否取消显示默认按钮 */
    hideDefault?: boolean
}