<template>
    <div class="progress-button" @click="progressClick($event)">
        <div
            class="progress-bar"
            :style="{ '--progressWidth': progressData * 100 + '%' }"
        ></div>
    </div>
</template>

<script>
export default {
    name: "ProgressButton",
    props: ["progressData"],
    methods: {
        progressClick(event) {
            // 获取鼠标点击位置
            let clickPosition = event.offsetX;
            let progressWidth = document.querySelector(".progress-button")
                .offsetWidth;

            let clickData = clickPosition / progressWidth;

            // console.log(clickPosition);
            // console.log(progressWidth);
            console.log(clickData);
            this.$emit("progressChange",clickData)
        },
    },
};
</script>

<style lang='scss' scoped>
.progress-button {
    width: 100%;
    height: 2px;
    // overflow-x: hidden;
    background-color: #fff8;
    cursor: pointer;

    transition: all 0.2s ease;
    &:hover {
        transform: scaleY(2);
        div::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%) translateX(50%) scaleY(0.5);
            border-radius: 50%;
            opacity: 1;
            height: 10px;
            width: 10px;
        }
    }
    .progress-bar {
        height: 100%;
        background-color: #f00;
        background-image: linear-gradient(
            -90deg,
            #ee7752,
            #e73c7e,
            #9c27b0,
            #3f51b5,
            #2196f3
        );
        // background-size: cover;
        background-attachment: fixed;

        max-width: var(--progressWidth);
        position: relative;

        transition: all 0.2s ease;
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 0;

            transform: translateY(-50%) translateX(50%);
            // margin: -1px -1px 0 0;
            background-color: #ddd;
            border-radius: 50%;
            height: 2px;
            width: 2px;
            margin: 0 auto;
            opacity: 0;
            transition: all 0.2s ease;
        }
    }
}
</style>