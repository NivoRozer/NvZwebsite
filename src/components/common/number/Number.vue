<template>
    <div class="number">
        <div
            :class="[item == value ? 'light-number' : 'background-number']"
            v-for="(item, index) in list"
            :key="index"
        >
            {{ item }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Number",
    props: ["value"],
    data() {
        return {
            newRanNum: "",
            list: [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, "."],
        };
    },
    created() {
        // console.log(this.value);
        this.newRanNum = this.value;
    },
    mounted() {
        // this.changeNum();
        // if (this.value == 0) {
        //     return;
        // } else if (this.value == ".") {
        //     return;
        // } else {
        //     this.changeNum();
        // }
    },
    computed: {},
    methods: {
        // changeNum() {
        //     const timer = setInterval(() => {
        //         this.newRanNum = Math.floor(Math.random() * 10);
        //     }, 100);
        //     this.$once("hook:beforeDestroy", () => {
        //         clearInterval(timer);
        //     });
        // },
    },
};
</script>

<style lang='scss' scoped>
.number {
    position: relative;
    
}
.background-number {
    font-family: "Courier New";
    position: absolute;
    // margin: -340px 0 0 0;
    font-size: 300px;
    font-weight: 100;
    color: rgba(0, 0, 0, 1);
    // color: #fff;
    // text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
    // 0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092;
    opacity: 0.1;
    // filter: blur(1px);
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px rgba(100, 70, 0, 1);
    filter: drop-shadow(0 0 20px 10px rgba(255, 70, 0, 1));
}

.light-number ~ .background-number {
    margin: -340px 0 0 0;
}
.number .light-number {
    font-family: "Courier New";
    // position: absolute;
    color: rgb(255, 170, 50);
    font-size: 300px;
    text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
        0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    // transition: all 0.1s ease;
    filter: blur(0.5px);
    animation: blink 3s infinite;
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