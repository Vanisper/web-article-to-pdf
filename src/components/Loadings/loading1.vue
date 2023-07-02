<template>
    <div id="loading">
        <div class="spinner"></div>
    </div>
</template>

<style lang="less" scoped>
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

#loading {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #8ae79d82;
    z-index: 9999;

    .spinner {
        margin: auto;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #fff;
        animation: spin 0.8s ease infinite;
    }
}
</style>