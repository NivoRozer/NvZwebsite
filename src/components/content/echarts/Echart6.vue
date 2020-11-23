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
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    left: 10,
                    textStyle: {
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12",
                    },
                    data: [
                        "直接访问",
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "搜索引擎",
                    ],
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: "20",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 234, name: "联盟广告" },
                            { value: 135, name: "视频广告" },
                            { value: 1548, name: "搜索引擎" },
                        ],
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