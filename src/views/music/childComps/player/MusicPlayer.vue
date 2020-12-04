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
                <div id="music-cover">这是封面</div>
                <div id="music-name">{{ $store.state.music.str }}</div>
                <div id="music-artist">艺术家</div>
            </div>
            <div id="music-control">
                <div id="play-mode" @click="playMode">顺序</div>
                <div id="last" @click="lastMusic">上一首</div>
                <div id="play-pause" @click="togglePlay">playButton</div>
                <div id="next" @click="nextMusic">下一首</div>
                <div id="volume">
                    <progress-button
                        :progressData="volume"
                        @progressChange="volumeClick"
                    />
                </div>
            </div>
            <div class="play-list">
                <img src="~@/assets/img/menu.png" alt="" />
            </div>
        </div>
        <audio controls src="/mp3/Test01.mp3">
            您的浏览器不支持 audio 元素。
        </audio>
    </div>
</template>

<script>
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
            musicSize: 0,
            progressWidth: "",
            volume: 0.5,
        };
    },
    created() {},
    mounted() {
        // 初始化并实时更新进度条
        this.progressUpdate();
    },
    computed: {
        progressPosition() {
            // 这里计算出进度条长度
            return (this.time / this.musicSize) * this.progressWidth;
        },
    },
    methods: {
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
            console.log("上一首");
        },
        togglePlay() {
            console.log("播放或暂停");
            let audio = document.querySelector("audio");
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        },
        nextMusic() {
            // if (this.index + 1 >= this.musicList.length) {
            //     this.index = 0;
            //     this.musicInfo = this.musicList[this.index];
            // } else {
            //     this.musicInfo = this.musicList[this.index + 1];
            //     this.index++;
            // }
            console.log("下一首");
        },
        volumeClick(clickData) {
            let audio = document.querySelector("audio");
            this.volume = clickData;
            audio.volume = this.volume;
        },
    },
};
</script>

<style lang='scss' scoped>
.music-player {
    height: 80px;
    display: grid;
    padding: 10px 0 0 0;
    grid-template-rows: 2px auto;
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
        grid-template-columns: 1fr 2fr 1fr;
        align-items: center;
        #music-info {
            display: grid;
            grid-template-columns: 1fr 2fr 2fr;
        }
        #music-control {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            #play-pause {
                cursor: pointer;
            }
        }
        .play-list {
            img {
                height: 30px;
                width: 30px;
            }
        }
    }
}
</style>