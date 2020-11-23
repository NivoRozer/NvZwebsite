<template>
    <div class="back-button" @click="routeBack">返回</div>
</template>

<script>
export default {
    name: "BackButton",
    methods: {
        routeBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang='scss' scoped>
.back-button {
    height: 3.5rem;
    width: 3.5rem;
    position: fixed;
    top: 2rem;
    left: 2rem;
    border-radius: 2rem;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.4);
    transition: all 0.5s ease;
    overflow: hidden;
    background-color: #fff;
    text-align: center;
    line-height: 3.5rem;
    cursor: pointer;
    z-index: 10;
}
</style>