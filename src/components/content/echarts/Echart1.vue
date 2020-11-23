<template>
    <div class="echart1">
        <div class="com-chart" ref="echart1_ref">abc</div>
    </div>
</template>

<script>
export default {
    name: "Echart1",
    data() {
        return {
            chartInstance: null,
            allData: null,
        };
    },
    mounted() {
        this.initChart();
        this.getData();

        // window.onresize = () => {
        //     this.chartInstance.resize();
        // };

        // window.addEventListener("resize", () => {
        //     this.chartInstance.resize();
        //     console.log('resize');
        // });
    },
    methods: {
        // 初始化echart对象
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.echart1_ref);
        },
        // 获取服务器数据
        getData() {
            this.updateChart();
        },
        // 更新图表
        updateChart() {
            const option = {
                title: {
                    // text: "折线图堆叠",
                },
                // color: ["#2f89cf"],
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    top: "0%",
                    textStyle: {
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12",
                    },
                    data: [
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "直接访问",
                        "搜索引擎",
                    ],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日",
                    ],
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,0.6)",
                            fontSize: 12,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,0.6)",
                            fontSize: 12,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)",
                        },
                    },
                },
                series: [
                    {
                        name: "邮件营销",
                        type: "line",
                        stack: "总量",
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: "联盟广告",
                        type: "line",
                        stack: "总量",
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name: "视频广告",
                        type: "line",
                        stack: "总量",
                        data: [150, 232, 201, 154, 190, 330, 410],
                    },
                    {
                        name: "直接访问",
                        type: "line",
                        stack: "总量",
                        data: [320, 332, 301, 334, 390, 330, 320],
                    },
                    {
                        name: "搜索引擎",
                        type: "line",
                        stack: "总量",
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                    },
                ],
            };
            this.chartInstance.setOption(option);
        },
    },
};
</script>

<style lang="scss" scoped>
.com-chart {
    height: 210px;
}
</style>