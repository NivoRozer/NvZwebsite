<template>
    <button class="play-all-button">播放全部</button>
</template>

<script>
export default {
    name: "PlayAllButton",
    methods: {

    },
};
</script>

<style lang='scss' scoped>
button {
    cursor: pointer;
    height: 40px;
    width: 100px;
    border-radius: 20px;
    border: none;
    background-color: #fff2;
    transition: all 0.2s ease;
    color: #fff;
    &:hover {
        box-shadow: 0 0 4px #fff;
        background-color: #fff4;
    }
}
</style>