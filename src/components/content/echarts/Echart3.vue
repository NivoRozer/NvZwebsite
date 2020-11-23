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
                color: ["#3398DB"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1],
                    },
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 274, name: "联盟广告" },
                            { value: 235, name: "视频广告" },
                            { value: 400, name: "搜索引擎" },
                        ].sort(function (a, b) {
                            return a.value - b.value;
                        }),
                        roseType: "radius",
                        label: {
                            color: "rgba(255, 255, 255, 0.6)",
                        },
                        labelLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.3)",
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20,
                        },
                        itemStyle: {
                            color: "#c23531",
                            shadowBlur: 200,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },

                        animationType: "scale",
                        animationEasing: "elasticOut",
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        },
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