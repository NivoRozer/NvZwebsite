<template>
    <div class="echart3">
        <div class="com-chart" ref="echart3_ref">abc</div>
    </div>
</template>

<script>
export default {
    name: "Echart3",
    data() {
        return {
            chartInstance: null,
            allData: null,
        };
    },
    mounted() {
        this.initChart();
        this.getData();
    },
    methods: {
        // 初始化echart对象
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.echart3_ref);
        },
        // 获取服务器数据
        getData() {
            this.updateChart();
        },
        // 更新图表
        updateChart() {
            const option = {
                // color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                },
                legend: {
                    data: [
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "直接访问",
                        "搜索引擎",
                    ],
                    textStyle: {
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12",
                    },
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
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
                ],
                yAxis: [
                    {
                        type: "value",
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
                ],
                series: [
                    {
                        name: "邮件营销",
                        type: "line",
                        stack: "总量",
                        smooth: true,
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },

                    {
                        name: "直接访问",
                        type: "line",
                        stack: "总量",
                        smooth: true,
                        areaStyle: {},
                        data: [320, 332, 301, 334, 390, 330, 320],
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