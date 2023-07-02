<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useDraggable } from './hooks/useDraggable';
import button1 from "./components/Buttons/button1.vue";
// InstanceType：自动推导类型
type Button1Ctx = InstanceType<typeof button1>;

const dragDomRef = ref<Button1Ctx>();
let draggableInstance: useDraggable;

onMounted(() => {
  draggableInstance = new useDraggable(dragDomRef.value!.$el);
})

onUnmounted(() => {
  draggableInstance.destroy();
})
</script>

<template>
  <button1 class="draggable" text="导出PDF" draggable="true" ref="dragDomRef" />
</template>

<style scoped lang="less">
.draggable {
  position: fixed;
  top: 100px;
  right: 24px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease 0.1s;
  z-index: 99999;
}
</style>
