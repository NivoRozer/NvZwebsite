<template>
    <div class="echart2">
        <div class="com-chart" ref="echart2_ref">abc</div>
    </div>
</template>

<script>
export default {
    name: "Echart2",
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
            this.chartInstance = this.$echarts.init(this.$refs.echart2_ref);
        },
        // 获取服务器数据
        getData() {
            this.updateChart();
        },
        // 更新图表
        updateChart() {
            const option = {
                color: ["#3398DB"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日",
                    ],
                    axisTick: {
                        alignWithLabel: true,
                    },
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
                        name: "直接访问",
                        type: "bar",
                        barWidth: "60%",
                        data: [10, 52, 200, 334, 390, 330, 220],
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