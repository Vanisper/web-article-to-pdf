<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useDraggable } from './hooks/useDraggable';
import button1 from "./components/Buttons/button1.vue";
import loading1 from './components/Loadings/loading1.vue';
import { rules } from "../config/rules";
import { IRule } from '../config/types';

// InstanceType：自动推导类型
type Button1Ctx = InstanceType<typeof button1>;

const dragDomRef = ref<Button1Ctx>();
let draggableInstance: useDraggable;
const isShow = ref(false);

function preventDefault(e: Event) {
  e.preventDefault();
}
const action = () => {
  stopScroll.value = false;
  isShow.value = true;
  // 禁用滚动条的滚轮事件
  window.addEventListener('wheel', preventDefault, { passive: false });
  window.scrollTo(0, 0);
  smoothScrollToBottom();
}

const stopScroll = ref(false);
const stop = () => {
  stopScroll.value = true
}
// 循环滚动
function smoothScrollToBottom() {
  var scrollHeight = document.body.scrollHeight;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  if (stopScroll.value) {
    isShow.value = false; // 移除遮罩层
    window.removeEventListener('wheel', preventDefault); // 恢复鼠标滚动事件
    return;
  }
  if (scrollTop + clientHeight >= scrollHeight) {
    // 到达底部，停止滚动
    isShow.value = false; // 移除遮罩层
    window.removeEventListener('wheel', preventDefault); // 恢复鼠标滚动事件
    setTimeout(() => {
      window.print(); // 调用浏览器打印事件
    }, 200);
    return;
  } else {
    // 滚动到下一页
    window.scrollTo({
      top: scrollTop + clientHeight,
      behavior: 'auto' // 可以设置成光滑的
    });
    // 延时执行，等待页面加载完成
    setTimeout(smoothScrollToBottom, 1000);
  }
}
const currentUrl = window.location.href;
let curr = { url: "", name: "", class: "", style: "", target: "body" };
const flag = ref(false);
onMounted(() => {
  flag.value = rules.some(((e: IRule) => {
    var reg = new RegExp(e.url);
    if (reg.test(currentUrl)) {
      curr.url = currentUrl;
      curr.name = e.name;
      curr.class = e.class;
      curr.style = e.style;
      return true;
    }
  }))

  if (flag.value) {
    var style = document.createElement('style');
    style.innerHTML = `@media print {${curr.class}, .mod, a.setpdf { display: none!important;} div.setpdf-copyright { display: block!important; }} ${curr.style}`;
    document.head.appendChild(style);

    const target = document.querySelector(curr.target);
    // 添加版权信息
    const copyright = document.createElement("div");
    copyright.setAttribute('style', 'display:none');
    copyright.setAttribute('class', "setpdf-copyright");
    copyright.appendChild(document.createTextNode("来源："));
    const link = document.createElement('a');
    link.textContent = currentUrl;
    link.setAttribute('href', currentUrl);
    copyright.appendChild(link);
    target!.appendChild(copyright);
    setTimeout(() => {
      draggableInstance = new useDraggable(dragDomRef.value!.$el);
    }, 200)
  }
})

onUnmounted(() => {
  draggableInstance.destroy();
})
</script>

<template>
  <button1 v-show="flag" @click="action" class="setpdf" text="导出PDF" draggable="true" ref="dragDomRef" />
  <loading1 v-show="flag && isShow" @dblclick="stop" />
</template>

<style scoped lang="less">
.setpdf {
  position: fixed;
  top: 100px;
  right: 24px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease 0.1s;
  z-index: 9998;
}
</style>
