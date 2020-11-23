<template>
    <div class="detail-info">
        <div class="detail-title">
            <span>{{ mainTitle }}</span>
            <div class="psts"></div>
        </div>
        <div class="detail-content">
            <ul>
                <li v-for="(item, index) in content" :key="index">
                    <div class="detail-info-title">
                        <span
                            v-for="(titleItem, index) in item.detailTitle"
                            :key="index"
                            >{{ titleItem }}</span
                        >
                    </div>
                    <div class="detail-info-content">
                        <p
                            v-for="(contentItem, index) in item.detailContent"
                            :key="index"
                        >
                            {{ contentItem }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailInfo",
    props: ["detail"],
    data() {
        return {
            mainTitle: "",
            content: {},
        };
    },
    created() {
        this.mainTitle = this.detail.mainTitle;
        this.content = this.detail.content;
        console.log(this.mainTitle);
    },
};
</script>

<style lang='scss' scoped>
$Bluelight-color: rgba(0, 148, 164);
.detail-info {
    padding: 0 4px 4px 0;
    // width: 600px;
    transition: all 0.5s ease;
    transform-origin: 50% 50% 0;
    // filter: drop-shadow(4px 2px 2px rgba(0, 0, 0, 0.8));
    filter: drop-shadow(6px 2px 1px rgba(49, 62, 63, 0.5));
    // overflow: hidden;
    // transform: rotateY(-2deg) rotateX(-2deg);
    background: rgba(0, 0, 0, 0.2);
    margin: 10px 10px;
}
.detail-info:hover {
    transform: rotateY(0deg) rotateX(2deg) scale(1.05);
    .detail-title {
        background-color: rgba(221, 1, 77);
        box-shadow: 1px 1px 2px 2px rgba(221, 1, 77, 0.5);
        // box-shadow: 2px -1px 1px 2px rgba(155, 181, 172,0.5);
        filter: brightness(120%) drop-shadow(8px 2px 2px rgba(221, 1, 77, 0.5));
    }
}
.detail-title {
    padding: 0 0 0 10px;
    text-align: left;
    transition: all 0.5s ease;
    border-radius: 0px 5px 0px 0px;
    // box-shadow: 4px -2px 1px 1px rgba(155, 181, 172,0.5);
    filter: drop-shadow(4px 2px 2px rgba(155, 181, 172, 0.5));
    span {
        color: #000;
        font-family: "TT Lakes";
        letter-spacing: 0.1em;
        font-size: 18px;
        line-height: 28px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgb(0, 0, 0, 0.8);
    }
    background-color: rgb(155, 181, 172);
}
.detail-content {
    padding: 10px 10px;
}
.detail-info-title {
    display: grid;
    grid-auto-flow: column;
    margin: 0 0 5px 0px;
    span {
        color: rgba(123, 134, 136);
        text-shadow: 2px 1px 2px rgba(123, 134, 136, 0.6);
        font-family: "TT Lakes", "dengxian";
        text-transform: uppercase;
        letter-spacing: 0.1em;
        // margin: 0 50px 5px 10px;
        line-height: 20px;
    }
}
.detail-info-title:hover {
    filter: brightness(120%) drop-shadow(2px 1px 2px rgb(155, 181, 172, 0.5));
}
.detail-info-content {
    margin: 0 0 10px 10px;
    p {
        font-family: "TT Lakes", "dengxian";
        font-weight: bold;
        color: rgba(141, 154, 161);
        text-shadow: 2px 1px 2px rgba(141, 154, 161, 0.6);
        line-height: 20px;
        margin: 0 0 8px 0;
        user-select: text;
    }
    p:hover {
        filter: brightness(120%)
            drop-shadow(2px 1px 1px rgb(155, 181, 172, 0.2));
    }
}
</style>