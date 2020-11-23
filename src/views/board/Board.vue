<template>
    <div class="board">
        <header>
            <h1>数据可视化</h1>
            <div class="time">{{ nowDate }}</div>
        </header>
        <section class="mainbox">
            <div>
                <panel class="bar">
                    <!-- <h2>标题</h2> -->
                    <div class="chart">
                        <echart1 ref="echart1"></echart1>
                    </div>
                </panel>
                <panel class="line">
                    <echart2 ref="echart2"></echart2>
                </panel>
                <panel class="pie">
                    <echart3 ref="echart3"></echart3>
                </panel>
            </div>
            <div class="center">
                <div class="number">
                    <div class="number-header">
                        <ul>
                            <li>219</li>
                            <li>3136</li>
                        </ul>
                    </div>
                    <div class="number-footer">
                        <ul>
                            <li>当前数量</li>
                            <li>本月总数</li>
                        </ul>
                    </div>
                </div>
                <div class="map">
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <!-- <echart-map1 /> -->
                </div>
            </div>
            <div>
                <panel class="bar">
                    <!-- <div> -->
                    <!-- <h2>标题</h2> -->
                    <div class="chart">
                        <echart4 ref="echart4"></echart4>
                    </div>
                    <!-- </div> -->
                </panel>
                <panel class="line">
                    <echart5 ref="echart5"></echart5>
                </panel>
                <panel class="pie">
                    <echart6 ref="echart6"></echart6>
                </panel>
            </div>
        </section>
    </div>
</template>

<script>
// import { flexible, removeCdn } from "assets/js/cdn.js";
import Panel from "components/common/others/Panel";
import Echart1 from "components/content/echarts/Echart1";
import Echart2 from "components/content/echarts/Echart2";
import Echart3 from "components/content/echarts/Echart3";
import Echart4 from "components/content/echarts/Echart4";
import Echart5 from "components/content/echarts/Echart5";
import Echart6 from "components/content/echarts/Echart6";
import EchartMap1 from "components/content/echarts/EchartMap1";

export default {
    name: "Board",
    components: {
        Panel,
        Echart1,
        Echart2,
        Echart3,
        Echart4,
        Echart5,
        Echart6,
        EchartMap1,
    },
    data() {
        return {
            nowDate: "",
            timer: "",
        };
    },
    created() {
        this.currentTime();
    },
    mounted() {
        // 引用外部CDN
        // this.$nextTick(function () {
        //     const _this = this;
        //     flexible().then((flexible) => {
        //         // removeCdn('flexible');
        //     });
        // });

        window.addEventListener("resize", () => {
            this.$router.go(0);
            console.log("resize");
            // this.$refs.echart1.chartInstance.resize();
            // this.$refs.echart2.chartInstance.resize();
            // this.$refs.echart3.chartInstance.resize();
            // this.$refs.echart4.chartInstance.resize();
            // this.$refs.echart5.chartInstance.resize();
            // this.$refs.echart6.chartInstance.resize();
        });
    },
    beforeDestroy() {
        //组件销毁时移除CDN
        // removeCdn('flexible');
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除时间定时器
        }
    },
    methods: {
        currentTime() {
            this.timer = setInterval(() => {
                this.formatDate();
            }, 1000);
        },
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let week = date.getDay(); // 星期
            let weekArr = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
            ];
            let hour = date.getHours(); // 时
            hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
            let minute = date.getMinutes(); // 分
            minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
            let second = date.getSeconds(); // 秒
            second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
            this.nowDate = `${year}/${month}/${day} ${weekArr[week]} ${hour}:${minute}:${second} `;
        },
    },
};
</script>

<style lang='scss' scoped>
.board {
    min-height: 100vh;
    // width: 100vw;
    background-image: radial-gradient(circle at 50% 50%, #06b, #001);
    background-size: 200% center;
}
header {
    padding: 20px;
    margin: 0 0 20px 0;
    height: 80px;
    // background-color: #ddd1;
    // box-shadow: 0 2px 4px #0008;
    background-image: url(~assets/img/board/head_bg.png);
    background-size: 100% 100%;
    h1 {
        margin: 0;
        color: #fffa;
        text-align: center;
    }

    .time {
        position: absolute;
        top: 0;
        right: 0.375rem;
        line-height: 80px;
    }
}

.mainbox {
    min-width: 1024px;
    max-width: 1920px;
    // height: 300px;
    margin: 0 auto;
    padding: 10px 10px 0 10px;
    box-shadow: 0 2px 4px #0008;
    display: grid;
    grid-template-columns: 3fr 5fr 3fr;
}
.panel {
    h2 {
        height: 1rem;
        color: #fff8;
        line-height: 1rem;
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
    }
    div {
        height: 210px;
        // background-color: pink;
    }
}
.center {
    .number {
        margin: 0 10px 15px;
        background-color: #0001;
        padding: 15px;
        .number-header {
            border: 1px solid rgba(25, 186, 139, 0.1);
            ul {
                display: flex;
                li {
                    position: relative;
                    flex: 1;
                    line-height: 80px;
                    text-align: center;
                    height: 80px;
                    font-size: 70px;
                    color: #ffeb7b;
                    font-family: "FrozenCrystal";
                    &:first-child {
                        &::after {
                            content: "";
                            position: absolute;
                            top: 25%;
                            height: 50%;
                            width: 1px;
                            right: 0;
                            background-color: #fff5;
                        }
                    }
                }
            }
        }
        .number-footer {
            ul {
                display: flex;
                li {
                    color: #fff8;
                    flex: 1;
                    text-align: center;
                }
            }
        }
    }
    .map {
        height: 660px;
        margin: 0 10px 15px;
        background-color: #0001;
        padding: 15px;
        position: relative;
        .map1 {
            position: absolute;
            top: 50%;
            left: 50%;
            // margin: -250px 0 0 -250px;
            transform: translate(-50%, -50%);
            opacity: 30%;
            height: 500px;
            width: 500px;
            background-image: url(~assets/img/board/map.png);
            background-size: 100% 100%;
            z-index: 1;
        }
        .map2 {
            position: absolute;
            top: 50%;
            left: 50%;
            height: 500px;
            width: 500px;
            // margin: -250px 0 0 -250px;
            transform: translate(-50%, -50%);
            &::before {
                content: "";
                position: absolute;
                // opacity: 60%;
                height: 500px;
                width: 500px;
                background-image: url(~assets/img/board/jt.png);
                background-size: 100% 100%;
                z-index: 2;
                animation: map-rotate 10s linear infinite;
            }
            &::after {
                content: "";
                position: absolute;
                opacity: 60%;
                height: 500px;
                width: 500px;
                background-image: url(~assets/img/board/lbx.png);
                background-size: 100% 100%;
                z-index: 3;
                animation: map-rotate 20s linear infinite reverse;
            }
        }
    }
}
@keyframes map-rotate {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(-180deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}
</style>