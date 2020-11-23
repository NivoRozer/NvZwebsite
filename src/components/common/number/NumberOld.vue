// 暂时弃用
<template>
    <div class="number">
        <div class="light-number">{{ newRanNum }}</div>
        <div
            class="background-number"
            v-for="(item, index) in list"
            :key="index"
        >
            {{ item }}
        </div>
    </div>
</template>

<script>
export default {
    name: "NumberOld",
    props: ["value"],
    data() {
        return {
            newRanNum: "",
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        };
    },
    created() {
        console.log(this.value);
        this.newRanNum = this.value;
    },
    mounted() {
        // this.changeNum();
        if (this.value == 0) {
            return;
        } else if (this.value == ".") {
            return;
        } else {
            this.changeNum();
        }
    },
    computed: {},
    methods: {
        changeNum() {
            const timer = setInterval(() => {
                this.newRanNum = Math.floor(Math.random() * 10);
            }, 100);
            this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
            });
        },
    },
};
</script>

<style lang='scss' scoped>
.number {
    position: relative;
}
.number .light-number {
    font-family: "Courier New";
    color: rgb(255, 196, 1);
    font-size: 300px;
    text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
        0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    transition: all 0.1s ease;
    filter: blur(1px);
    animation: blink 3s infinite;
}
.background-number {
    font-family: "Courier New";
    position: absolute;
    margin: -340px 0 0 0;
    font-size: 300px;
    font-weight: 100;
    color: rgba(0, 0, 0, 1);
    // text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
    // 0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092;
    opacity: 0.12;
    filter: blur(1px);
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px rgb(0, 0, 0, 1);
}

@keyframes blink {
    20%,
    24%,
    55% {
        color: #111;
        text-shadow: none;
    }
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
        /*     color: #fccaff;    text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,      0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092; */
        text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
            0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00,
            0 0 98px #ff0000;
        // color: #fff6a9b9;
        color: rgb(255, 203, 50);
    }
}
</style>