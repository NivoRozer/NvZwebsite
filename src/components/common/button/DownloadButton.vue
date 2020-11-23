<template>
    <div class="button">
        <button @click="submit()" :disabled="isDisable">
            {{ btnDownload }}
        </button>
    </div>
</template>

<script>
export default {
    name: "DownloadButton",
    data() {
        return {
            isDisable: false,
            downloadUrl: `${process.env.BASE_URL}files/Testfiles.txt`,
            btnDownload: "下载简历",
        };
    },
    methods: {
        submit() {
            this.btnDownload = "下载中...";
            let a = document.createElement("a");
            a.href = this.downloadUrl;
            a.download = "test.txt";
            a.click();
            this.isDisable = true;
            setTimeout(() => {
                this.isDisable = false;
                this.btnDownload = "下载简历";
            }, 3000);
        },
        download() {
            this.pathUrl = "xxx url请求地址";
            this.$http({
                method: "get",
                url: this.pathUrl,
                responseType: "blob",
            }).then((res) => {
                if (res) {
                    if ("msSaveOrOpenBlob" in navigator) {
                        // Microsoft Edge and Microsoft Internet Explorer 10-11
                        window.navigator.msSaveOrOpenBlob(
                            res.data,
                            "文件名称" + new Date().getTime() + ".xls"
                        );
                        this.$message({
                            message: "导出成功",
                            type: "success",
                        });
                    } else {
                        // standard code for Google Chrome, Mozilla Firefox etc
                        let url = window.URL.createObjectURL(res.data);
                        let link = document.createElement("a");
                        link.style.display = "none";
                        link.href = url;
                        link.setAttribute(
                            "download",
                            "文件名称" + new Date().getTime() + ".xls"
                        );
                        document.body.appendChild(link);
                        link.click();
                        this.$message({
                            message: "导出成功",
                            type: "success",
                        });
                    }
                } else {
                    this.$message({
                        message: "导出失败",
                        type: "error",
                    });
                }
            });
        },
    },
};
</script>

<style lang='scss' scoped>
.button {
    z-index: 11;
    margin: 0 0 50px 0;
    display: flex;
    justify-content: center;
    button {
        transition: all 0.1s ease;

        height: 40px;
        width: 80px;
        background-color: rgba(2, 66, 83, 0.2);
        border: 2px solid rgba(2, 144, 159);
        filter: drop-shadow(1px 1px 1px rgba(3, 90, 102, 0.5));
        cursor: pointer;
        outline: none;
        font-size: 16px;
        text-shadow: 2px 1px 2px rgba(2, 144, 159, 0.5);
        font-family: "dengxian";
        color: rgba(218, 220, 194, 0.8);
    }
    button:hover {
        transform: scale(1.05);
        filter: brightness(120%) drop-shadow(2px 2px 4px rgba(3, 90, 102, 0.8));
    }
    button:active {
        transform: scale(0.95);
    }
}
</style>