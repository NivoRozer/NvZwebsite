<template>
    <div class="panel">
        <slot></slot>
        <div class="panel-footer"></div>
    </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.panel {
    height: 260px;
    border: 1px solid rgba(25, 186, 139, 0.17);
    padding: 10px 15px 40px 15px;
    margin: 0 0 15px 0;
    position: relative;
    background-color: #0001;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 10px;
        width: 10px;
        border-top: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 10px;
        width: 10px;
        border-top: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
    }
}
.panel-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 10px;
        width: 10px;
        border-bottom: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
    }
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        height: 10px;
        width: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
    }
}
</style>