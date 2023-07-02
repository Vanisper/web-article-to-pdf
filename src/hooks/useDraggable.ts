/**
 * 使传入的dom可随意拖拽
 * 暴露destroy方法，可在合适的时机销毁
 */
export class useDraggable {
    private draggableElement: HTMLElement | null;
    private isDragging: boolean;
    private isDraggable: boolean;
    private startPosition: { x: number; y: number };
    private currentX: number; // dom初始left
    private currentY: number; // dom初始top

    constructor(element: HTMLElement) {
        // if (!(element instanceof HTMLElement)) {
        //    return
        // }
        this.draggableElement = element;
        this.isDraggable = (element.getAttribute('draggable') === "true" || element.getAttribute('draggable') === "") ? true : false;
        this.isDragging = false;

        const elementRect = element.getBoundingClientRect();
        this.startPosition = { x: elementRect.x, y: elementRect.y };
        this.currentX = elementRect.left;
        this.currentY = elementRect.top;

        this.init();
    }

    private init() {
        // 不允许拖拽设置拖拽属性
        this.unDraggable();
        // 标准化位置
        const elementRect = this.draggableElement!.getBoundingClientRect();
        this.draggableElement!.style.position = "fixed";
        this.draggableElement!.style.left = elementRect.left + "px";
        this.draggableElement!.style.top = elementRect.top + "px";
        this.draggableElement!.style.right = "unset";
        // 监听resize事件
        window.addEventListener("resize", this.resetPosition)
        // 需要卸载的监听事件，回调函数必须使用箭头函数，
        // 否则无法正常remove
        // （Class中的非箭头成员函数在调用时如果需要使用全局的this的话，需要bind.(this)，正是因为这个原因，导致无法正常remove）
        this.draggableElement?.addEventListener("mousedown", this.startDragging);
    }

    private startDragging = (event: MouseEvent) => {
        // console.log("开始拖拽", this.startPosition);
        const elementRect = this.draggableElement!.getBoundingClientRect();
        this.startPosition = { x: elementRect.x, y: elementRect.y };
        this.currentX = elementRect.left;
        this.currentY = elementRect.top;
        this.isDragging = true;
        this.startPosition = {
            x: event.clientX,
            y: event.clientY,
        };

        window.addEventListener("mousemove", this.dragging);
        window.addEventListener("mouseup", this.stopDragging);
    }

    private dragging = (event: MouseEvent) => {
        if (this.isDragging && this.draggableElement) {
            const maxLeft = document.documentElement.clientWidth - this.draggableElement!.offsetWidth; // 紧贴最右边的时候left值
            const maxTop = document.documentElement.clientHeight - this.draggableElement!.offsetHeight; // 紧贴最下边的时候top值
            const offsetX = event.clientX - this.startPosition.x; // 此参数小于0时，说明鼠标是已经移出视图右边界，正在返回，此时需要矫正
            const offsetY = event.clientY - this.startPosition.y;

            let left = this.currentX + offsetX;
            let top = this.currentY + offsetY;

            // 超出边界矫正
            if (offsetX < 0) {
                // console.log("原先位置的左侧");
                left = Math.max(0, left);
            } else {
                // console.log("原先位置的右侧");
                left = Math.min(maxLeft, left);
            }
            if (offsetY < 0) {
                // console.log("原先位置的上侧");
                top = Math.max(0, top);
            } else {
                // console.log("原先位置的下侧");
                top = Math.min(maxTop, top);
            }
            this.draggableElement.style.position = "fixed";
            this.draggableElement.style.top = top + 'px';
            this.draggableElement.style.left = left + 'px';
        }
    }

    private stopDragging = () => {
        // console.log("停止拖拽", this.startPosition);
        this.isDragging = false;
        window.removeEventListener("mousemove", this.dragging, false);
        window.removeEventListener("mouseup", this.stopDragging, false);
    }

    private resetPosition = () => {
        const elementRect = this.draggableElement!.getBoundingClientRect();
        this.draggableElement!.style.position = "fixed";
        if (window.innerWidth < elementRect.right) {
            this.draggableElement!.style.left = window.innerWidth - elementRect.width + 'px';
        }
        if (window.innerHeight < elementRect.bottom) {
            this.draggableElement!.style.top = window.innerHeight - elementRect.height + 'px';
        }
        if (elementRect.top < 0) {
            this.draggableElement!.style.top = "0px"
        }
    }

    private draggable() {
        this.draggableElement?.setAttribute("draggable", "true");
        this.isDraggable = true
    }

    private unDraggable() {
        this.draggableElement?.setAttribute("draggable", "false");
        this.isDraggable = false
    }

    destroy() {
        this.draggableElement?.removeEventListener("mousedown", this.startDragging);
        window.removeEventListener("resize", this.resetPosition)
    }
}
