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
                <div
                    id="play-mode"
                    @click="playMode($store.state.music.loopState)"
                >
                    <img
                        src="~@/assets/img/music/loop.png"
                        v-show="$store.state.music.loopState === 0"
                        alt=""
                    />
                    <img
                        src="~@/assets/img/music/loop-1.png"
                        v-show="$store.state.music.loopState === 1"
                        alt=""
                    />
                    <img
                        src="~@/assets/img/music/random.png"
                        v-show="$store.state.music.loopState === 2"
                        alt=""
                    />
                </div>
                <div id="volume">
                    <div
                        class="mute"
                        @click="mute"
                        :class="muteState ? 'muted' : ''"
                    >
                        <img src="~@/assets/img/music/volume.png" alt="" />
                    </div>
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
            muteState: false,
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
        this.volume = window.localStorage.volume
            ? window.localStorage.volume
            : this.volume;

        this.$store.state.music.loopState = window.localStorage.loopState
            ? parseInt(window.localStorage.loopState)
            : this.$store.state.music.loopState;
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
        songInfo() {
            console.log(this.songInfo);
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
                if (this.$store.state.music.loopState === 1) {
                    audio.play();
                } else {
                    this.nextMusic();
                }
            });
            audio.addEventListener("canplay", () => {
                // 音频可以播放了
                console.log("canplay");
                audio.play();
            });
        },
        audioPlay(id) {
            let audio = document.querySelector("audio");

            if (id) {
                console.log("play" + id);
                getSongDetail(id)
                    .then((result) => {
                        console.log(result);
                        // this.songInfo.picUrl = result.songs[0].al.picUrl;
                        this.songInfo.picUrl = result.songs[0].al.picUrl;
                        this.songInfo.artists = result.songs[0].ar;
                        this.songInfo.name = result.songs[0].name;
                        document.getElementsByTagName(
                            "title"
                        )[0].innerText = this.songInfo.name;
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                getSongURL(id)
                    .then((result) => {
                        console.log(result);
                        // this.songInfo.url = result.data[0].url;
                        this.$set(this.songInfo, "url", result.data[0].url);
                        // audio.src = result.data[0].url;

                        // 获取数据后重新载入音乐
                        audio.load();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                // 停止音乐
                audio.pause();
                this.audioState = 0;

                audio.src = "";
                this.songInfo = {};
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
        lastMusic() {
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
            } else {
                audio.pause();
                console.log("暂停");
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
        playMode(loopState) {
            let musicLists = this.$store.state.music.musicLists;

            if (loopState === 2) {
                loopState = 0;
            } else {
                loopState += 1;
            }
            this.$store.state.music.loopState = loopState;
            window.localStorage.loopState = loopState;

            // 判断状态是否为随机播放且播放列表不为空
            if (loopState === 2 && musicLists.length) {
                this.$store.state.music.shuffledLists = this.shuffle(
                    musicLists
                );
                console.log(
                    this.$store.state.music.shuffledLists.map(
                        (item) => item.name
                    )
                );
            }
        },
        mute() {
            let audio = document.querySelector("audio");
            this.muteState = !this.muteState;
            audio.muted = this.muteState;
        },
        volumeClick(clickData) {
            let audio = document.querySelector("audio");
            let volStorage = window.localStorage;
            this.volume = clickData;
            audio.volume = this.volume;
            volStorage.volume = this.volume;
        },
        showList() {
            this.isShow = !this.isShow;
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
        shuffle(arr) {
            let n = arr.length,
                shuffledArr = Object.assign([], arr),
                random;
            // console.log(n, test, test * n--, (test * n) >>> 0);
            while (n != 0) {
                // random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
                random = Math.floor(Math.random() * n--);
                [shuffledArr[n], shuffledArr[random]] = [
                    shuffledArr[random],
                    shuffledArr[n],
                ]; // ES6的结构赋值实现变量互换

                // console.log(random);
                // console.log(test);
                // console.log(arr.map((item) => item.name));
            }
            return shuffledArr;
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
#play-mode {
    height: 30px;
    width: 30px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        filter: drop-shadow(0 0 5px #fff8);
    }
    img {
        height: 100%;
        width: 100%;
    }
}
#volume {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;
    transition: all 0.2s ease;
    .mute {
        position: relative;
        cursor: pointer;
        height: 30px;
        width: 30px;
        img {
            height: 100%;
            width: 100%;
        }
        &:hover {
            filter: drop-shadow(0 0 5px #fff8);
        }
        &::before {
            content: "";
            position: absolute;
            height: 0px;
            width: 2px;
            border-radius: 2px;
            left: 50%;
            top: 50%;
            background-color: #fff;
            transform: translate(-50%, -50%) rotate(-45deg);
            transition: all 0.2s ease;
        }
    }
    .muted {
        &::before {
            content: "";
            height: 35px;
        }
    }
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