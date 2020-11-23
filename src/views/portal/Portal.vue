<template>
    <div class="portal bg">
        <!-- <back-button /> -->
        <div class="portal-container">
            <div
                v-for="(item, index) in portalList"
                :key="index"
                class="portal-box"
                :class="currentIndex == index ? 'active' : ''"
                @mouseenter="portalActive(index)"
                @click="portalClick(item)"
            >
                <img :src="item.imgURL" alt="" />
                <div class="project-info">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BackButton from "components/common/button/BackButton.vue";

export default {
    name: "Portal",
    components: {
        BackButton,
    },
    data() {
        return {
            portalList: [
                {
                    projectId: "001",
                    name: "项目1",
                    path: "",
                    imgURL: "",
                },
                {
                    projectId: "002",
                    name: "音乐播放器",
                    path: "/music",
                    imgURL:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606116463266&di=8777f9c4fa3fb3dd80d3e69796089f15&imgtype=0&src=http%3A%2F%2Fr.sinaimg.cn%2Flarge%2Farticle%2F3039876ad7ebb587e63eef7b34f767c0",
                },
                {
                    projectId: "003",
                    name: "项目3",
                    path: "",
                    imgURL: "",
                },
                {
                    projectId: "004",
                    name: "数据可视化",
                    path: "/board",
                    imgURL:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606116031233&di=e45c0922e202d7c5f1e06a4c83ece653&imgtype=0&src=http%3A%2F%2Fhbimg.huabanimg.com%2Fdf40618d4d959dcc6007d80675a66f10fb3f593c1a2b2-CGzCbK_fw658",
                },
            ],
            currentIndex: -1,
            flag: false,
        };
    },
    mounted() {
        this.portalInit();
    },
    methods: {
        portalInit() {
            setTimeout(() => {
                this.currentIndex = 0;
            }, 100);
            setTimeout(() => {
                this.flag = true;
            }, 600);
        },
        portalActive(index) {
            if (this.flag) {
                this.currentIndex = index;
            }
        },
        portalClick(item) {
            if (item.path) {
                this.$router.push(item.path);
            } else {
                console.log("暂无项目路径");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.portal {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(135deg, #fff, #666);
    background-size: cover;
    position: fixed;
}
.portal-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 2600px;
    transform-style: preserve-3d;
    transform: translateZ(-400px); //解决谷歌浏览器Z轴遮挡问题
}
.portal-box {
    width: 400px;
    height: 500px;
    border-radius: 20px;
    background-image: linear-gradient(0deg, #fff, #ddd);
    transition: all 0.5s ease;
    // transform-origin: 90% 10% 100px;
    transform-origin: 50% 50% 400px;
    transform: rotateY(60deg);
    -moz-transform: rotateY(75deg) rotateX(0deg) scale(1);

    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));

    margin: 0 -150px;

    cursor: pointer;
    overflow: hidden;
    img {
        max-width: 100%;
        height: 60%;
        object-fit: cover;
        margin: 0 auto;
        box-shadow: 0 0 2px #0008;
    }
}
.project-info {
}

.active {
    color: red;
    transform: rotateY(0deg) rotateX(0deg) scale(1);

    margin: 0 -250px;
}
.active:hover {
    filter: drop-shadow(0 0 5px $primary-shadow-color);
}
.active ~ div {
    color: green;
    transform-origin: 50% 50% 400px;
    transform: rotateY(-60deg);
    -moz-transform: rotateY(-75deg) rotateX(0deg) scale(1);
}

/*chrome*/
// @media screen and (-webkit-min-device-pixel-ratio: 0) {
//     .active {
//         color: blue;
//     }
// }

/*FireFox*/
// @-moz-document url-prefix() {
//     .active {
//         color: orange;
//     }
// }

@media screen and (max-width: 600px) {
    .portal-container {
        display: grid;
        // grid-template-columns: 1fr;
        grid-auto-flow: row;
        padding: 20px;
    }
    .portal-box {
        width: 240px;
        height: 140px;
        transform: none;
        margin: 0;
    }
    .active {
        transform: none;
    }
    .active ~ div {
        transform: none;
    }
}
.bg {
    background-image: linear-gradient(
        125deg,
        #ee7752,
        #e73c7e,
        #9c27b0,
        #3f51b5,
        #2196f3
    );
    background-size: 400%;
    animation: bganimation 20s ease infinite;
}
@keyframes bganimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>