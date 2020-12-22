<template>
    <div class="music">
        <div class="player-container frosted-glass">
            <header>
                <h2>Music Player</h2>
                <!-- <search @search="search" /> -->
                <search />
            </header>
            <div class="player-body">
                <nav class="player-menu">
                    <div
                        v-for="item in menuList"
                        :key="item.id"
                        @click="menuClick(item.path)"
                        :class="{
                            active: $route.path.includes(item.path),
                        }"
                    >
                        {{ item.name }}
                    </div>
                    <!-- <div>最新MV</div> -->
                    <!-- <router-link to="/music/discovery">发现音乐</router-link>
                    <router-link to="/music/search">推荐歌单</router-link>
                    <router-link to="">最新音乐</router-link> -->
                </nav>
                <div class="player-content">
                    <keep-alive include="SearchDetail,Discovery">
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
            <footer><music-player /></footer>
            <!-- <div class="music-list">
                <ul>
                    <li v-for="(item, id) in musicList" :key="id">
                        <div class="music-list-name">
                            <span>{{ item.name | filterNull }}</span>
                        </div>
                        <div class="music-list-artist">
                            <span>{{ item.artist | filterNull }}</span>
                        </div>
                        <div class="music-list-album">
                            <span>{{ item.album | filterNull }}</span>
                        </div>
                        <div class="music-list-control">播放</div>
                    </li>
                </ul>
            </div>
            <music-controler
                :musicInfo="musicInfo"
                @lastMusic="lastMusic"
                @nextMusic="nextMusic"
            ></music-controler> -->
        </div>
    </div>
</template>

<script>
import MusicControler from "@/components/common/MusicControler";

import Search from "./childComps/Search";
import MusicPlayer from "./childComps/player/MusicPlayer";

export default {
    name: "Music",
    components: {
        MusicControler,
        Search,
        MusicPlayer,
    },
    data() {
        return {
            index: 0,
            // musicInfo: "",
            defaultIndex: "",
            menuList: [
                {
                    id: "001",
                    name: "发现音乐",
                    path: "discovery",
                },
                {
                    id: "002",
                    name: "推荐歌单",
                    path: "playlists",
                },
                {
                    id: "003",
                    name: "最新音乐",
                    path: "newsongs",
                },
            ],
        };
    },
    filters: {
        //过滤空数据
        filterNull(item) {
            return (item = item ? item : "暂无");
        },
    },
    created() {
        // this.musicInfo = this.musicLists[0];
        this.defaultMenuActive();
    },
    mounted() {},
    methods: {
        menuClick(path) {
            if (!this.$route.path.includes(path)) {
                this.$router.push(path);
                this.defaultIndex = path;
            } else {
                console.log("已位于该页面");
            }
        },
        defaultMenuActive() {
            this.defaultIndex = this.$route.path.split("/").reverse()[0];
        },
        // 接收搜索框组件传出的事件和参数
        // search(keywords, type) {
        //     // console.log("外部事件" + keywords + type);
        //     // this.$router.push("search/" + keywords);
        //     this.$router.push({
        //         name: "SearchDetail",
        //         query: {
        //             keywords: keywords,
        //             type: type,
        //         },
        //     });
        // },

        // lastMusic() {
        //     if (this.index === 0) {
        //         this.index = this.musicList.length - 1;
        //         this.musicInfo = this.musicList[this.index];
        //     } else {
        //         this.musicInfo = this.musicList[this.index - 1];
        //         this.index--;
        //     }
        //     console.log(this.index);
        //     console.log(this.musicInfo);
        // },
        // nextMusic() {
        //     if (this.index + 1 >= this.musicList.length) {
        //         this.index = 0;
        //         this.musicInfo = this.musicList[this.index];
        //     } else {
        //         this.musicInfo = this.musicList[this.index + 1];
        //         this.index++;
        //     }
        //     console.log(this.index);
        //     console.log(this.musicInfo);
        // },
    },
};
</script>

<style lang='scss' scoped>
.music {
    height: 100vh;
    // overflow: hidden;
    padding: 40px;
    // color: #ccc;
    background: url(~@/assets/img/f551871cb5171dc69a2294d749f6fe9f81368713.jpg)
        center center / cover no-repeat fixed;
}

.player-container {
    padding: 20px;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 0 0 20px rgb(0, 0, 0, 0.2);
    background-color: #0008;
    backdrop-filter: blur(5px);
    transition: all 0.5s ease;
    // display: grid;
    // grid-template-rows: 50px auto 50px;
    header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0 0 20px 0;
    }
    .player-body {
        display: grid;
        grid-template-columns: 1fr 5fr;
        .player-menu {
            z-index: 2;
            div {
                position: relative;
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                &:hover {
                    text-shadow: 0 0 4px #ddd8;
                    // background: ;
                    // color: #333;
                }
            }
            // 以下为菜单跟随滚动条效果
            div::before {
                content: "";
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                height: 0;
                border-right: 2px solid #ddd8;
                transition: 0.2s all linear;
            }
            div:hover::before {
                height: 100%;
                top: 0;
                transition-delay: 0.1s;
            }
            div:hover ~ div::before {
                top: 0;
            }
            .active {
                // border-right: 2px solid #fff8;
                box-shadow: 2px 0 2px #fff8;
                transition: 0.2s all ease;
                &::before {
                    // border-right: none;
                    height: 100%;
                    top: 0;
                }
            }
        }
        .player-content {
            // padding: 10px;
            border-radius: 4px;
            height: calc(100vh - 250px);
            overflow-y: auto;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2),
                inset 0 0 20px rgba(0, 0, 0, 0.2);
        }
    }
    footer {
        height: 80px;
        // background-color: #fff8;
    }
}

.frosted-glass {
    z-index: 10;
    overflow: hidden; // 为防止效果不超出 content 的范围
    background-size: 100%;
    position: relative;
}
.frosted-glass::after {
    content: "";
    background: url(~@/assets/img/f551871cb5171dc69a2294d749f6fe9f81368713.jpg)
        center center / cover no-repeat fixed;
    filter: blur(10px) brightness(60%);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    margin: -30px; //为解决元素的边缘模糊的效果减弱
}

@media screen and (max-width: 600px) {
    .music {
        padding: 20px;
        position: fixed;
    }
    .player-container {
        h2 {
            margin: 0;
        }
    }
    .music-list {
        li {
            padding: 8px;
            display: grid;
            grid-auto-flow: row;
            grid-template: 1fr/ 1fr 1fr;
            grid-template-areas: "a a " "b c";
            grid-column-gap: 20px;
            .music-list-name {
                // min-width: 200px;
                line-height: 30px;
                grid-area: a;
            }
            .music-list-artist {
                font-size: 10px;
                line-height: 12px;
            }
            .music-list-album {
                font-size: 10px;
                line-height: 12px;
            }
            .music-list-control {
                display: none;
            }
        }
    }
}
</style>