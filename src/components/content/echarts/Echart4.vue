<template>
    <div class="echart4">
        <div class="com-chart" ref="echart4_ref">abc</div>
    </div>
</template>

<script>
export default {
    name: "Echart4",
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
            this.chartInstance = this.$echarts.init(this.$refs.echart4_ref);
        },
        // 获取服务器数据
        getData() {
            this.updateChart();
        },
        // 更新图表
        updateChart() {
            const option = {
                // color: ["#3398DB"],
                tooltip: {},
                // legend: {
                //     data: [
                //         "预算分配（Allocated Budget）",
                //         "实际开销（Actual Spending）",
                //     ],
                //     top: "0%",
                //     textStyle: {
                //         color: "rgba(255,255,255,0.5)",
                //         fontSize: "12",
                //     },
                // },
                radar: {
                    // shape: 'circle',
                    nameGap: 10,
                    center: ["50%", "50%"],
                    name: {
                        textStyle: {
                            color: "rgba(255,255,255,0.6)",
                            fontSize: 12,
                            // backgroundColor: "#999",
                            borderRadius: 3,
                            // padding: [3, 5],
                        },
                    },
                    indicator: [
                        { name: "销售", max: 6500 },
                        { name: "管理", max: 16000 },
                        {
                            name: "信息技术",
                            max: 30000,
                        },
                        { name: "客服", max: 38000 },
                        { name: "研发", max: 52000 },
                        { name: "市场", max: 25000 },
                    ],
                },
                series: [
                    {
                        name: "预算 vs 开销（Budget vs spending）",
                        type: "radar",
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [
                                    4300,
                                    10000,
                                    28000,
                                    35000,
                                    50000,
                                    19000,
                                ],
                                name: "预算分配（Allocated Budget）",
                            },
                            {
                                value: [
                                    5000,
                                    14000,
                                    28000,
                                    31000,
                                    42000,
                                    21000,
                                ],
                                name: "实际开销（Actual Spending）",
                            },
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