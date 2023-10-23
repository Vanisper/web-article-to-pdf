import { IRule } from "../types";

export const zhihuMatch = ["https://zhuanlan.zhihu.com/p/*", "https://www.zhihu.com/question/*/answer/*", "https://www.zhihu.com/question/*"]
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
    },
    // 知乎提问板块-指定某个回答
    {
        url: "https?://www.zhihu.com/question/\\d+/answer/\\d+",
        name: "zhihu",
        class: ".AppHeader, .Question-sideColumn, .ContentItem-actions, .CornerButtons, .MoreAnswers, .ViewAll",
        style: `
        @media print {
            .ListShortcut{
                width: 100%;
            }
            .Question-mainColumn {
                width: 100%;
            }
        }`,

    },
    {
        url: "https?://www.zhihu.com/question/\\d+",
        name: "zhihu",
        class: ".AppHeader, .Question-sideColumn, .ContentItem-actions, .CornerButtons, .MoreAnswers, .ViewAll",
        style: `
        @media print {
            .ListShortcut{
                width: 100%;
            }
            .Question-mainColumn {
                width: 100%;
            }
        }`,
        hideDefault: true,
        javascript: () => {
            const listItem = document.querySelector(".AnswersNavWrapper")?.querySelectorAll(".List-item");
            if (!listItem) return false;

            // 创建一个打印当前局部dom的按钮
            const printItem = (doc: HTMLElement | Element, url: string) => {
                // 查询该dom
                if (!doc) return false;

                // 创建新窗口
                const newWindow = window.open(
                    url,
                    "_blank",
                    "width=1080,height=800,menubar=yes,scrollbars=yes,resizable=yes"
                );
                // if (newWindow) {
                //     const style = newWindow.document.createElement("style");
                //     style.innerHTML = `
                //             .print-hide {
                //                 display: none;
                //             }
                //         `;
                //     newWindow.document.head.appendChild(style);
                //     // 添加内容
                //     newWindow.document.body.appendChild(doc.cloneNode(true) as Node);
                //     // 打印
                //     // newWindow.print();
                //     // 关闭窗口
                //     // newWindow.close();
                // }
            }
            listItem.forEach((item, index) => {
                const box = item.querySelector(".AnswerItem-authorInfo");
                const name = item.querySelector(".AnswerItem")?.attributes.getNamedItem("name")?.value


                if (!box || !name) return false;
                // 插入一个带事件的按钮
                const printBtn = document.createElement("button");
                printBtn.innerHTML = "打印当前回答";
                printBtn.className = "print-btn_" + index;
                const url = window.location.href + `/answer/${name}`;
                printBtn.onclick = () => {
                    printItem(item, url)
                }
                box.append(printBtn)
            })
        }
    }
]
