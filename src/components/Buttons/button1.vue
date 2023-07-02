<template>
    <button>
        <span class="span-mother">
            <span v-for="(item, index) in text" :key="item" :style="{ transition: `${0.1 * index + 0.1}s` }">{{ item
            }}</span>
        </span>
        <span class="span-mother2">
            <span v-for="(item, index) in text" :key="item" :style="{ transition: `${0.1 * index + 0.1}s` }">{{ item
            }}</span>
        </span>
    </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: ""
    }
})
const number = ref(props.text.length)
</script>


<style lang="less" scoped>
button {
    font-weight: bold;
    color: white;
    border-radius: 2rem;
    width: 95.02px;
    height: 42.66px;
    border: none;
    background-color: #3653f8;
    display: flex;
    justify-content: center;
    align-items: center;

    .span-mother {
        display: flex;
        overflow: hidden;

        span {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .span-mother2 {
        display: flex;
        position: absolute;
        overflow: hidden;

        span {
            transform: translateY(-1.2em);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &:hover {
        .span-mother {
            position: absolute;

            span {
                transform: translateY(1.2em);
            }
        }

        .span-mother2 {
            span {
                transform: translateY(0);
            }
        }
    }
}
</style>