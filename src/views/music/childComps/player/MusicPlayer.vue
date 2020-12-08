<template>
    <div class="music-player">
        <div
            id="progress-bar"
            @click="progressClick($event)"
            :style="{ '--progressWidth': progressPosition + 'px' }"
        >
            <div class="in-progress"></div>
        </div>
        <div class="music-controler-container">
            <div id="music-info">
                <div id="music-cover">
                    <img
                        v-show="songInfo.picUrl"
                        :src="songInfo.picUrl"
                        alt=""
                    />
                </div>
                <div id="music-name">
                    {{ songInfo.name }}
                </div>
                <div id="music-artist">
                    <span
                        v-for="(item, index) in songInfo.artists"
                        :key="index"
                        >{{ item.name }}</span
                    >
                </div>
            </div>
            <div id="music-control">
                <div id="last" @click="lastMusic">
                    <img src="~@/assets/img/music/left.png" alt="" />
                </div>
                <div id="play-pause" @click="togglePlay">
                    <!-- <transition name="fade"> -->
                    <img
                        src="~@/assets/img/music/pause.png"
                        v-show="audioState"
                        alt=""
                    />
                    <!-- </transition> -->
                    <!-- <transition name="fade"> -->
                    <img
                        src="~@/assets/img/music/play.png"
                        v-show="!audioState"
                        alt=""
                    />
                    <!-- </transition> -->
                </div>
                <div id="next" @click="nextMusic">
                    <img src="~@/assets/img/music/right.png" alt="" />
                </div>
            </div>
            <div class="play-menu">
                <div id="play-mode" @click="playMode">顺序</div>
                <div id="volume">
                    <progress-button
                        :progressData="volume"
                        @progressChange="volumeClick"
                    />
                </div>
                <div class="play-list" @click.stop="showList">
                    <img src="~@/assets/img/menu.png" alt="" />
                </div>
            </div>
            <music-list v-show="isShow" />
        </div>
        <audio :src="songInfo.url">您的浏览器不支持 audio 元素。</audio>
    </div>
</template>

<script>
import { getSongDetail, getSongURL } from "network/play";

import MusicList from "./MusicList";
import ProgressButton from "components/common/button/ProgressButton";

export default {
    name: "MusicPlayer",
    components: {
        MusicList,
        ProgressButton,
    },
    data() {
        return {
            time: 0,
            musicSize: 1,
            progressWidth: "",
            volume: 0.5,
            audioState: 0,
            isShow: false,
            songInfo: {
                url: "",
                picUrl: "",
                artists: [],
                name: "",
            },
        };
    },
    created() {
        // this.refresh = this.debounce(this.searchSuggest, 500);
    },
    mounted() {
        // 初始化并实时更新进度条
        this.progressUpdate();
        this.listHide();
        this.initAudio();
    },
    computed: {
        progressPosition() {
            // 这里计算出进度条长度
            return (this.time / this.musicSize) * this.progressWidth;
        },
        // 返回vuex数据
        isPlaying() {
            return this.$store.state.music.isPlaying;
        },
    },
    watch: {
        // 监听vuex中当前播放数据变化
        isPlaying(val) {
            this.audioPlay(val.id);
        },
    },
    methods: {
        // 防抖
        debounce(fn, delay) {
            let timer = null;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(fn, delay);
            };
        },
        initAudio() {
            // 监听播放状态修改播放按钮图标
            let audio = document.querySelector("audio");
            audio.addEventListener("playing", () => {
                this.audioState = 1;
            });
            audio.addEventListener("pause", () => {
                this.audioState = 0;
            });
            audio.addEventListener("ended", () => {
                console.log("ended");
                //循环播放列表音乐
                this.nextMusic();
            });
        },
        audioPlay(id) {
            console.log("play" + id);
            let audio = document.querySelector("audio");

            if (id) {
                getSongDetail(id)
                    .then((result) => {
                        console.log(result);
                        // this.songInfo.picUrl = result.songs[0].al.picUrl;
                        this.songInfo = {
                            picUrl: result.songs[0].al.picUrl,
                            artists: result.songs[0].ar,
                            name: result.songs[0].name,
                        };
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                // if (audio.paused) {
                //     // 暂停中
                // } else {
                //     // 播放中
                // }
                getSongURL(id)
                    .then((result) => {
                        console.log(result);
                        this.songInfo.url = result.data[0].url;
                        // 获取数据后重新载入音乐
                        audio.load();
                        audio.addEventListener("canplay", () => {
                            // 音频可以播放了
                            console.log("canplay");
                            audio.play();
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                // audio.pause();
                // this.songInfo = {};
            }
        },
        progressUpdate() {
            let audio = document.querySelector("audio");
            audio.volume = this.volume;

            this.progressWidth = document.querySelector(
                "#progress-bar"
            ).offsetWidth;

            window.addEventListener("resize", () => {
                // 监听窗口变化修改进度条长度
                this.progressWidth = document.querySelector(
                    "#progress-bar"
                ).offsetWidth;
            });

            audio.addEventListener("durationchange", () => {
                // 可以显示播放时长了哟
                this.musicSize = audio.duration;
            });
            audio.addEventListener("timeupdate", () => {
                // 更新与播放进度相关的内容
                this.time = audio.currentTime;
            });
        },
        progressClick(event) {
            // 获取鼠标点击位置
            let clickPosition = event.offsetX;
            let audio = document.querySelector("audio");

            let clickTime =
                (clickPosition / this.progressWidth) * this.musicSize;

            console.log(clickTime);

            audio.currentTime = clickTime;
        },
        playMode() {},
        lastMusic() {
            // if (this.index === 0) {
            //     this.index = this.musicList.length - 1;
            //     this.musicInfo = this.musicList[this.index];
            // } else {
            //     this.musicInfo = this.musicList[this.index - 1];
            //     this.index--;
            // }
            let uuid = this.isPlaying.uuid;
            let musicListLength = this.$store.state.music.musicLists.length;
            if (uuid && musicListLength !== 1) {
                console.log("上一首");
                this.$store.commit("lastMusic");
            } else {
                console.log("暂无音乐");
            }
        },
        togglePlay() {
            let audio = document.querySelector("audio");
            if (audio.paused) {
                audio.play();
                console.log("播放");
                // this.audioState = 1;
            } else {
                audio.pause();
                console.log("暂停");
                // this.audioState = 0;
            }
        },
        nextMusic() {
            let uuid = this.isPlaying.uuid;
            let musicListLength = this.$store.state.music.musicLists.length;
            if (uuid && musicListLength !== 1) {
                console.log("下一首");
                this.$store.commit("nextMusic");
            } else {
                console.log("暂无音乐");
            }
        },
        volumeClick(clickData) {
            let audio = document.querySelector("audio");
            this.volume = clickData;
            audio.volume = this.volume;
        },
        showList() {
            this.isShow = !this.isShow;
            // if (this.isShow) {
            //     console.log("显示");
            // } else {
            //     console.log("隐藏");
            // }
        },
        listHide() {
            // 监听body点击事件，点击播放列表以外的部分时触发隐藏
            document.body.addEventListener(
                "click",
                () => {
                    this.isShow = false;
                },
                false
            );
        },
    },
};
</script>

<style lang='scss' scoped>
.music-player {
    height: 80px;
    display: grid;
    padding: 8px 0 0 0;
    grid-template-rows: 2px auto;
    position: relative;
    #progress-bar {
        width: 100%;
        // overflow-x: hidden;
        background-color: #fff8;
        cursor: pointer;

        transition: all 0.2s ease;
        &:hover {
            transform: scaleY(2);
            div::after {
                content: "";
                position: absolute;
                top: 50%;
                transform: translateY(-50%) translateX(50%) scaleY(0.5);
                border-radius: 50%;
                opacity: 1;
                height: 10px;
                width: 10px;
            }
        }
        .in-progress {
            height: 100%;
            background-color: #f00;
            background-image: linear-gradient(
                -90deg,
                #ee7752,
                #e73c7e,
                #9c27b0,
                #3f51b5,
                #2196f3
            );
            // background-size: cover;
            background-attachment: fixed;

            max-width: var(--progressWidth);
            position: relative;

            transition: all 0.2s ease;
            &::after {
                content: "";
                position: absolute;
                top: 50%;
                right: 0;

                transform: translateY(-50%) translateX(50%);
                // margin: -1px -1px 0 0;
                background-color: #ddd;
                border-radius: 50%;
                height: 2px;
                width: 2px;
                margin: 0 auto;
                opacity: 0;
                transition: all 0.2s ease;
            }
        }
    }
    .music-controler-container {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr;
        column-gap: 20px;
        align-items: center;
        padding: 10px 0 0 0;
        img {
            display: block;
        }

        #music-control {
            display: grid;
            align-items: center;
            justify-items: center;
            grid-template-columns: 1fr 1fr 1fr;
            // column-gap: 20px;
            div {
                transition: all 0.2s ease;
                &:hover {
                    filter: drop-shadow(0 0 5px #fff8);
                }
            }
            #last {
                cursor: pointer;
                // border-left: 2px solid rgb(230, 231, 232);
                img {
                    height: 40px;
                }
            }
            #play-pause {
                position: relative;
                cursor: pointer;
                height: 60px;
                width: 60px;
                img {
                    position: absolute;
                    height: 60px;
                }
            }
            #next {
                cursor: pointer;
                // border-right: 2px solid rgb(230, 231, 232);
                img {
                    height: 40px;
                }
            }
        }
        .play-menu {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-items: center;
        }
        .play-list {
            // position: relative;
            // width: 30px;
            cursor: pointer;
            img {
                height: 30px;
                width: 30px;
            }
        }
    }
}
#music-info {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    align-items: center;
}
#music-cover {
    height: 60px;
    width: 60px;
    img {
        border-radius: 5px;
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.5), 10px 10px 20px rgb(0, 0, 0, 0.2);
        height: 100%;
    }
}
#music-artist {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    // animation: 15s wordsLoop linear infinite alternate;
    span {
        transition: all 0.5s ease;
        &:hover {
            text-shadow: 0 0 2px #fff8;
        }
        &:not(:last-child)::after {
            content: "/";
        }
    }
}
#volume {
    width: 200px;
}

@keyframes wordsLoop {
    0% {
        transform: translateX(0);
        -webkit-transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}
</style>